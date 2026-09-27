import { Effect, Layer } from "effect";
import { PlanRepo } from "./repo";
import { Plan, PlanCode } from "./schema";

const PLANS: ReadonlyArray<Plan> = [
  new Plan({ code: "free", name: "Free", priceInCents: 0, rank: 0 }),
  new Plan({
    code: "enterprise",
    name: "Enterprise",
    priceInCents: 19900,
    rank: 2,
  }),
  new Plan({ code: "pro", name: "Pro", priceInCents: 2900, rank: 1 }),
];

export const PlanRepoMemory = Layer.effect(
  PlanRepo,
  Effect.sync(() => {
    const plans = new Map<PlanCode, Plan>(
      PLANS.map((plan) => [plan.code, plan]),
    );
    return {
      list: Effect.sync(() => [...plans.values()]),
    };
  }),
);
