import { Effect, Layer } from "effect";
import { AccountRepo } from "./repo";
import { Account, AccountId } from "./schema";
import { AccountNotFound } from "./errors";

const ACCOUNTS: ReadonlyArray<Account> = [
  new Account({ id: AccountId.make("acc_noord"), name: "Studio Noord" }),
  new Account({
    id: AccountId.make("acc_ketting"),
    name: "Fietsenwinkel De Ketting",
  }),
];

export const AccountRepoMemory = Layer.effect(
  AccountRepo,
  Effect.sync(() => {
    const accounts = new Map<AccountId, Account>(
      ACCOUNTS.map((acc) => [acc.id, acc]),
    );
    return {
      get: (id) =>
        Effect.gen(function* () {
          const acc = accounts.get(id);
          if (!acc) return yield* new AccountNotFound({ id });
          return acc;
        }),
    };
  }),
);
