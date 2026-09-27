import { Schema } from "effect";
import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
} from "effect/unstable/httpapi";
import { PlanGroup } from "./features/plan/api";

class PubliekGroup extends HttpApiGroup.make("publiek").add(
  HttpApiEndpoint.get("health", "/health", {
    success: Schema.Struct({ status: Schema.Literal("ok") }),
  }),
) {}

export class AbboApi extends HttpApi.make("abbo")
  .add(PubliekGroup)
  .add(PlanGroup)
  .prefix("/v1") {}
