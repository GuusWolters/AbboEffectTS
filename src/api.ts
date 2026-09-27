import { Schema } from "effect";
import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
} from "effect/unstable/httpapi";
import { PlanGroup } from "./features/plan/api";
import { HealthGroup } from "./features/health/api";

export class AbboApi extends HttpApi.make("abbo")
  .add(HealthGroup)
  .add(PlanGroup)
  .prefix("/v1") {}
