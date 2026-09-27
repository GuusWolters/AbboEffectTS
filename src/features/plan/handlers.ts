import { HttpApiBuilder } from "effect/unstable/httpapi";
import { AbboApi } from "../../api";
import { Effect } from "effect";
import { PlanRepo } from "./repo";
import { PlanService } from "./service";

export const PlanHandlers = HttpApiBuilder.group(AbboApi, "plan", (handlers) =>
  Effect.gen(function* () {
    const service = yield* PlanService;
    return handlers.handleAll({
      list: () => service.list,
    });
  }),
);
