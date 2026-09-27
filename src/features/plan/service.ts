// features/plan/service.ts
import { Context, Effect, Layer } from "effect";
import { PlanRepo } from "./repo";

export class PlanService extends Context.Service<PlanService>()(
  "abbo/PlanService",
  {
    make: Effect.gen(function* () {
      const repo = yield* PlanRepo;
      return {
        list: repo.list.pipe(
          Effect.map((list) => list.toSorted((a, b) => a.rank - b.rank)),
        ),
      };
    }),
  },
) {
  static readonly layer = Layer.effect(this, this.make);
}
