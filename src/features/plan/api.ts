import { HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi";
import { Plan } from "./schema";
import { Schema } from "effect";

export class PlanGroup extends HttpApiGroup.make("plans").add(
  HttpApiEndpoint.get("list", "/plans", {
    success: Schema.Array(Plan),
  }),
) {}
