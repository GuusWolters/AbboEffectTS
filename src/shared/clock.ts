import { Context, Effect, Layer } from "effect";

class Clock extends Context.Service<
  Clock,
  {
    now: Effect.Effect<Date>;
  }
>()("abbo/clockService") {}

export const ClockLive = Layer.succeed(Clock, {
  now: Effect.sync(() => new Date()),
});

export const ClockTest = Layer.succeed(Clock, {
  now: Effect.succeed(new Date("2026-01-01T00:00:00Z")),
});
