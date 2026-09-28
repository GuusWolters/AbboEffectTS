import { Data } from "effect";
import { AccountId } from "./schema";

export class AccountNotFound extends Data.TaggedError("AccountNotFound")<{
  readonly id: AccountId;
}> {}
