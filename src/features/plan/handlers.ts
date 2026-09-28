import { HttpApiBuilder } from "effect/unstable/httpapi";
import { AbboApi } from "../../contract";
import { Effect } from "effect";
import { PlanService } from "./service";

export const PlanHandlers = HttpApiBuilder.group(AbboApi, "plans", (handlers) =>
  Effect.gen(function* () {
    const service = yield* PlanService;
    return handlers.handleAll({
      list: () => service.list,
    });
  }),
);
