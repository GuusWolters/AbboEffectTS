import { Context, Effect, Layer } from "effect";

class ClockService extends Context.Service<
  ClockService,
  {
    now: Effect.Effect<Date>;
  }
>()("abbo/clockService") {}

export const Clock = Layer.succeed(ClockService, {
  now: Effect.sync(() => new Date()),
});

export const ClockTest = Layer.succeed(ClockService, {
  now: Effect.succeed(new Date("2026-01-01T00:00:00Z")),
});
