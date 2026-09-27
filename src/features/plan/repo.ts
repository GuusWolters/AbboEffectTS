import { Context, Effect } from "effect";
import type { Plan } from "./schema";

export class PlanRepo extends Context.Service<
  PlanRepo,
  {
    readonly list: Effect.Effect<ReadonlyArray<Plan>>;
  }
>()("abbo/PlanRepo") {}
