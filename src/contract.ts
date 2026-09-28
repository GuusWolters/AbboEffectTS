import { HttpApi } from "effect/unstable/httpapi";
import { PlanGroup } from "./features/plan/contract";
import { HealthGroup } from "./features/health/contract";

export class AbboApi extends HttpApi.make("abbo")
  .add(HealthGroup)
  .add(PlanGroup)
  .prefix("/v1") {}
