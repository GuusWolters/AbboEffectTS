import { HttpApiBuilder } from "effect/unstable/httpapi";
import { AbboApi } from "../../api";
import { Effect } from "effect";
import { PlanRepo } from "./repo";

export const PlanHandlers = HttpApiBuilder.group(AbboApi, "plan", (handlers) =>
  Effect.gen(function* () {
    const repo = yield* PlanRepo;
    return handlers.handleAll({
      list: () => repo.list,
    });
  }),
);
