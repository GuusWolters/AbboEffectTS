import { Effect, Layer } from "effect";
import { HttpApiBuilder, HttpApiScalar } from "effect/unstable/httpapi";
import { HttpRouter } from "effect/unstable/http";
import { BunHttpServer, BunRuntime } from "@effect/platform-bun";
import { Port } from "./shared/config";
import { AbboApi } from "./api";
import { PlanHandlers } from "./features/plan/handlers";
import { PlanRepoMemory } from "./features/plan/repo.memory";

const PubliekHandlers = HttpApiBuilder.group(AbboApi, "publiek", (handlers) =>
  handlers.handle("health", () => Effect.succeed({ status: "ok" as const })),
);

const ApiLive = HttpApiBuilder.layer(AbboApi, {
  openapiPath: "/openapi.json",
}).pipe(
  Layer.provide(PubliekHandlers),
  Layer.provide(PlanHandlers),
  Layer.provide(PlanRepoMemory),
);

const ServerLive = HttpRouter.serve(
  Layer.mergeAll(ApiLive, HttpApiScalar.layer(AbboApi, { path: "/docs" })),
).pipe(Layer.provide(BunHttpServer.layerConfig({ port: Port })));

BunRuntime.runMain(Layer.launch(ServerLive));
