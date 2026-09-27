import { Config } from "effect";

export const Port = Config.Port("PORT").pipe(Config.withDefault(3000));

export const AbboConfig = Config.all({
  port: Port,
});
