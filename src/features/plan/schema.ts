import { Schema } from "effect";

export const PlanCode = Schema.Literals(["free", "pro", "enterprise"]);
export type PlanCode = typeof PlanCode.Type;

export class Plan extends Schema.Class<Plan>("Plans")({
  code: PlanCode,
  name: Schema.String,
  priceInCents: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  rank: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
}) {
  isHigherThan(plan: Plan) {
    return this.rank > plan.rank;
  }
}
