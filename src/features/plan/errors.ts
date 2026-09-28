import { Schema } from "effect";
import { PlanCode } from "./schema";

export class InvalidUpgrade extends Schema.TaggedError<InvalidUpgrade>()(
  "InvalidUpgrade",
  { from: PlanCode, to: PlanCode },
  { httpApiStatus: 422 },
) {}
