# DriveNova - Luxury Electric Vehicle Marketplace

A modern, responsive web application for discovering, comparing, and booking premium electric vehicles in India.

## Features

- 🚗 **Vehicle Fleet Showcase** - Browse our collection of luxury EVs
- 🤖 **AI Assistant** - Get personalized car recommendations based on budget and preferences
- 💰 **EMI Calculator** - Calculate monthly payments with adjustable parameters
- 🔄 **Trade-In Valuation** - Get instant valuation for your current vehicle
- 🏁 **Test Drive Booking** - Book a personalized test drive at your nearest center
- 📊 **Vehicle Comparison** - Compare specs and features side-by-side

## Tech Stack

- **Frontend**: React 19 with TanStack Router
- **Backend**: TanStack React Start with Nitro
- **Styling**: Tailwind CSS 4 with custom components
- **Form Handling**: React Hook Form + Zod validation
- **Email Service**: Brevo (formerly Sendinblue) - Free tier with 300 emails/day
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites
- Bun package manager (v1.0+)
- Node.js 18+ (if not using Bun)
- Git

### Installation

1. Clone the repository:
```bash
cd DRIVENOVA
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Get a free Brevo API key:
   - Visit https://app.brevo.com/settings/account/api
   - Create an account (free)
   - Generate API key
   - Add to `.env.local`:
   ```
   BREVO_API_KEY=your_api_key_here
   ```

### Development

Start the dev server:
```bash
bun run dev
```

Visit `http://localhost:5173` in your browser.

### Building

Build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

## API Endpoints (Server Functions)

### Test Drive Booking
POST `/test-drive`
- Validates booking data
- Sends confirmation emails to admin and customer
- Uses Brevo for email delivery

### Trade-In Valuation
POST `/trade-in`
- Calculates vehicle valuation based on:
  - Brand and base price
  - Age of vehicle
  - Kilometers driven
  - Vehicle condition
- Sends notification to admin

### Contact Form
POST `/contact`
- Handles customer inquiries
- Sends email to admin and confirmation to customer

## Deployment to Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub repository

### Steps

1. Push code to GitHub
2. Connect GitHub repo to Vercel:
   - Visit https://vercel.com/new
   - Select your repository
   - Select Framework: "Other"

3. Set Environment Variables in Vercel:
   - `BREVO_API_KEY`: Your Brevo API key
   - `FROM_EMAIL`: Sender email address
   - `ADMIN_EMAIL`: Admin notification email

4. Deploy!

Vercel will automatically deploy on every push to main.

## Free Resources Used

- **Brevo**: 300 free emails/day (enough for small businesses)
- **Vercel**: Unlimited free deployments and hosting
- **Tailwind CSS**: Free open-source framework
- **Radix UI**: Free, unstyled component library

## Project Structure

```
src/
├── components/          # React components
│   ├── drivenova/      # App-specific components
│   └── ui/             # Reusable UI components
├── lib/                 # Utilities and helpers
│   ├── api/            # Server functions (APIs)
│   └── drivenova/      # App-specific utilities
├── routes/             # TanStack Router pages
├── assets/             # Images and static files
└── styles/             # Global styles
```

## Contributing

Feel free to open issues and submit pull requests.

## License

MIT
