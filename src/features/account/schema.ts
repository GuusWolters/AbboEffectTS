import { Schema } from "effect";

export const AccountId = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^acc_[a-z0-9_]+$/)),
  Schema.brand("AccountId"),
);
export type AccountId = typeof AccountId.Type;

export class Account extends Schema.Class<Account>("Account")({
  id: AccountId,
  name: Schema.String.pipe(Schema.check(Schema.isMinLength(2))),
}) {}
