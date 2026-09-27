import { Effect, Layer } from "effect";
import { PlanRepo } from "./repo";
import { Plan, PlanCode } from "./schema";

export const PlanRepoMemory = Layer.effect(
  PlanRepo,
  Effect.sync(() => {
    const plans = new Map<PlanCode, Plan>([
      [
        "free",
        new Plan({ code: "free", name: "Free", priceInCents: 0, rank: 0 }),
      ],
      [
        "enterprise",
        new Plan({
          code: "enterprise",
          name: "Enterprise",
          priceInCents: 19900,
          rank: 2,
        }),
      ],
      [
        "pro",
        new Plan({ code: "pro", name: "Pro", priceInCents: 2900, rank: 1 }),
      ],
    ]);
    return {
      list: Effect.sync(() => [...plans.values()]),
    };
  }),
);
