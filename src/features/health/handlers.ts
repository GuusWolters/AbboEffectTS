import { HttpApiBuilder } from "effect/unstable/httpapi";
import { AbboApi } from "../../api";
import { Effect } from "effect";

export const HeatlHandlers = HttpApiBuilder.group(
  AbboApi,
  "health",
  (handlers) =>
    handlers.handle("health", () => Effect.succeed({ status: "ok" as const })),
);
