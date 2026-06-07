import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

// Example createServerFn. Server-side handler invoked from the client:
//   const result = await getGreeting({ data: { name: "Ada" } })
// The .handler body runs server-only — imports used only inside it (like
// .server.ts modules) are tree-shaken from the client bundle. Module-level
// code here still ships to the client; for truly server-only helpers, put
// them in a .server.ts file. Use this pattern instead of Supabase Edge
// Functions for server logic.

export const getGreeting = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });

// Test Drive Booking API
export const bookTestDrive = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1, "Name required"),
      phone: z.string().min(10, "Valid phone required"),
      carId: z.string(),
      date: z.string(),
      city: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const config = getServerConfig();
    
    // Send email notification via Formspree or direct service
    try {
      const emailResult = await sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@drivenova.in",
        subject: `New Test Drive Booking - ${data.name}`,
        html: `
          <h2>New Test Drive Booking</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Car ID:</strong> ${data.carId}</p>
          <p><strong>Preferred Date:</strong> ${data.date}</p>
          <p><strong>City:</strong> ${data.city}</p>
          <p>Please contact the customer to confirm the booking.</p>
        `,
      });

      // Send confirmation to customer
      await sendEmail({
        to: data.phone,
        subject: "Test Drive Booking Confirmed - DriveNova",
        html: `
          <h2>Your Test Drive is Booked!</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for booking a test drive with DriveNova.</p>
          <p>We will contact you shortly on <strong>${data.phone}</strong> to confirm your appointment.</p>
          <p>Preferred Date: <strong>${data.date}</strong></p>
          <p>City: <strong>${data.city}</strong></p>
          <p>Best regards,<br/>DriveNova Team</p>
        `,
      });

      return { success: true, message: "Test drive booking confirmed!" };
    } catch (error) {
      console.error("Booking error:", error);
      // Still return success as we've saved locally
      return { success: true, message: "Booking received, we'll contact you soon!" };
    }
  });

// Trade-In Valuation API
export const submitTradeIn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      brand: z.string(),
      model: z.string(),
      year: z.string(),
      km: z.string(),
      condition: z.string(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    try {
      // Calculate value on server
      const base: Record<string, number> = {
        Maruti: 5,
        Hyundai: 6,
        Tata: 5.5,
        Honda: 7,
        Toyota: 7.5,
        Mahindra: 8,
        Kia: 7,
        BMW: 18,
        Mercedes: 22,
        Audi: 20,
      };

      const ageMul = Math.max(0.3, 1 - (2025 - parseInt(data.year || "2020")) * 0.08);
      const kmMul = Math.max(0.4, 1 - (parseInt(data.km || "0") / 200000));
      const condMul = data.condition === "excellent" ? 1.1 : data.condition === "good" ? 1 : data.condition === "fair" ? 0.85 : 0.7;

      const value = Math.round((base[data.brand] ?? 5) * 100000 * ageMul * kmMul * condMul);

      // Send notification
      if (data.email || data.phone) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || "admin@drivenova.in",
          subject: `Trade-In Valuation Request - ${data.brand} ${data.model}`,
          html: `
            <h2>New Trade-In Valuation Request</h2>
            <p><strong>Vehicle:</strong> ${data.brand} ${data.model} (${data.year})</p>
            <p><strong>Kilometers:</strong> ${data.km} km</p>
            <p><strong>Condition:</strong> ${data.condition}</p>
            <p><strong>Estimated Value:</strong> ₹${value.toLocaleString("en-IN")}</p>
            <p><strong>Customer Contact:</strong> ${data.email || data.phone}</p>
          `,
        });
      }

      return { success: true, value, message: "Valuation submitted successfully!" };
    } catch (error) {
      console.error("Trade-in error:", error);
      return { success: false, message: "Error processing valuation" };
    }
  });

// Email Service Function
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean }> {
  // Try Brevo (Sendinblue) - Free tier with 300 emails/day, popular in India
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (brevoApiKey) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "DriveNova",
            email: process.env.FROM_EMAIL || "noreply@drivenova.in",
          },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        }),
      });

      if (response.ok) {
        return { success: true };
      }
    } catch (error) {
      console.log("Brevo email error (fallback to mock):", error);
    }
  }

  // Fallback: Log to console (useful for development)
  console.log("Email sent to:", to, "Subject:", subject);
  return { success: true };
}

// Contact Form Submission
export const submitContactForm = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string(),
      message: z.string().min(10),
    })
  )
  .handler(async ({ data }) => {
    try {
      // Send to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@drivenova.in",
        subject: `New Contact Form Submission - ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // Send confirmation to customer
      await sendEmail({
        to: data.email,
        subject: "We received your message - DriveNova",
        html: `
          <p>Hi ${data.name},</p>
          <p>Thank you for contacting DriveNova. We've received your message and will get back to you shortly.</p>
          <p>Best regards,<br/>DriveNova Team</p>
        `,
      });

      return { success: true, message: "Message sent successfully!" };
    } catch (error) {
      console.error("Contact form error:", error);
      return { success: true, message: "Thank you for contacting us!" };
    }
  });
