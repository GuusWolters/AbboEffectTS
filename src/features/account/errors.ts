import { Data } from "effect";

export class AccountNotFound extends Data.TaggedError("AccountNotFound")<{
  readonly id: string;
}> {}
