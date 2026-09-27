import { Schema } from "effect";
import { AccountId } from "./schema";

export class AccountNotFound extends Schema.TaggedError<AccountNotFound>()(
  "AccountNotFound",
  { id: AccountId },
  { httpApiStatus: 404 },
) {}
