import { Config } from "effect";

export const Port = Config.Port("PORT").pipe(Config.withDefault(3000));
