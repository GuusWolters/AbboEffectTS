import { Effect, Layer } from "effect";
import { PlanRepo } from "./repo";
import { Plan } from "./schema";

export const PlanRepoMemory = Layer.effect(
  PlanRepo,
  Effect.sync(() => {
    const plans = new Map<string, Plan>([
      ["1", new Plan({ code: "free", name: "Free", priceInCents: 0, rank: 0 })],
      [
        "2",
        new Plan({ code: "pro", name: "Pro", priceInCents: 2900, rank: 1 }),
      ],
      [
        "3",
        new Plan({
          code: "enterprise",
          name: "Enterprise",
          priceInCents: 19900,
          rank: 2,
        }),
      ],
    ]);
    return {
      list: Effect.sync(() =>
        [...plans.values()].sort((a, b) => a.rank - b.rank),
      ),
    };
  }),
);
