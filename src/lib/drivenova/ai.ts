import { CARS, type Car } from "./cars";

export type AiReply = {
  text: string;
  cars: Car[];
};

// Lightweight rule-based recommendation engine for the demo experience.
// (Can be swapped for a real LLM call later via Lovable AI Gateway.)
export function recommend(query: string): AiReply {
  const q = query.toLowerCase();

  // Extract budget in lakh (e.g. "15 lakh", "under 15l", "₹15")
  const budgetMatch = q.match(/(\d{1,3}(?:\.\d+)?)\s*(l|lakh|lac|lakhs)?/);
  const budget = budgetMatch ? parseFloat(budgetMatch[1]) : undefined;

  const wantsSUV = /suv|family|7\s*seat|spacious/.test(q);
  const wantsSedan = /sedan|saloon|business/.test(q);
  const wantsPerf = /sport|performance|fast|speed|gt|coupe/.test(q);
  const wantsCity = /city|compact|small|first car|budget/.test(q);
  const wantsTruck = /truck|pickup|haul|cargo/.test(q);

  let pool = [...CARS];

  if (budget) pool = pool.filter((c) => c.price <= budget + 0.5);
  if (wantsSUV) pool = pool.filter((c) => c.type.includes("SUV"));
  if (wantsSedan) pool = pool.filter((c) => c.type === "Sedan");
  if (wantsPerf) pool = pool.filter((c) => c.power >= 400);
  if (wantsCity) pool = pool.filter((c) => c.type === "Compact SUV" || c.price < 12);
  if (wantsTruck) pool = pool.filter((c) => c.type === "Truck");

  if (pool.length === 0) pool = CARS.filter((c) => (budget ? c.price <= budget + 2 : true));

  // Rank: closeness to budget + rating
  pool.sort((a, b) => {
    const aScore = (budget ? -Math.abs(a.price - budget) : 0) + a.rating;
    const bScore = (budget ? -Math.abs(b.price - budget) : 0) + b.rating;
    return bScore - aScore;
  });

  const picks = pool.slice(0, 3);

  const intro = buildIntro({ budget, wantsSUV, wantsSedan, wantsPerf, wantsCity, wantsTruck });
  const body =
    picks.length > 0
      ? `Here are my top picks${budget ? ` under ₹${budget} lakh` : ""}:\n\n` +
        picks
          .map(
            (c, i) =>
              `${i + 1}. **${c.name}** (${c.type}) — ₹${c.price} L · ${c.range} km range · ${c.power} hp · ${c.seats} seats`,
          )
          .join("\n")
      : "I couldn't find a perfect match. Try widening your budget or relaxing the body type.";

  return { text: `${intro}\n\n${body}`, cars: picks };
}

function buildIntro(opts: {
  budget?: number;
  wantsSUV: boolean;
  wantsSedan: boolean;
  wantsPerf: boolean;
  wantsCity: boolean;
  wantsTruck: boolean;
}) {
  if (opts.wantsSUV && opts.budget)
    return `Great choice — a family SUV under ₹${opts.budget} lakh gives you space, range, and safety in one package.`;
  if (opts.wantsPerf) return "If performance is what excites you, look at our high-output configurations.";
  if (opts.wantsCity) return "For city driving, agile and efficient is the way to go.";
  if (opts.wantsTruck) return "Our electric trucks combine utility with serious power.";
  return "Based on what you described, here's what I'd recommend.";
}

export const SUGGESTIONS = [
  "Best SUV under ₹15 lakh for a family",
  "Fastest car you have",
  "Compact city car under ₹10 lakh",
  "Premium sedan with long range",
];