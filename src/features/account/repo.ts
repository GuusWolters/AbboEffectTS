import { Context, Effect } from "effect";
import type { Account, AccountId } from "./schema";
import type { AccountNotFound } from "./errors";

export class AccountRepo extends Context.Service<
  AccountRepo,
  {
    readonly get: (id: AccountId) => Effect.Effect<Account, AccountNotFound>;
  }
>()("abbo/AccountRepo") {}
