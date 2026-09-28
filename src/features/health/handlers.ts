import { HttpApiBuilder } from "effect/unstable/httpapi";
import { AbboApi } from "../../contract";
import { Effect } from "effect";

export const HealthHandlers = HttpApiBuilder.group(
  AbboApi,
  "health",
  (handlers) =>
    handlers.handle("health", () => Effect.succeed({ status: "ok" as const })),
);
