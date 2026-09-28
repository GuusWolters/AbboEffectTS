import { DateTime, Effect, Schema } from "effect";
import { AccountId } from "../account/schema";
import { PlanCode } from "../plan/schema";
import { CustomerCancelled } from "./errors";
import { CustomerId, CustomerName, Email, Status } from "./values";

export class Customer extends Schema.Class<Customer>("Customer")({
  id: CustomerId,
  accountId: AccountId,
  name: CustomerName,
  email: Email,
  status: Status.pipe(
    Schema.withConstructorDefault(Effect.succeed("active" as const)),
  ),
  plan: PlanCode.pipe(
    Schema.withConstructorDefault(Effect.succeed("free" as const)),
  ),
  createdAt: Schema.DateTimeUtcFromString,
  updatedAt: Schema.DateTimeUtcFromString,
  canceledAt: Schema.DateTimeUtcFromString.pipe(Schema.optional),
}) {
  // BR-3: nieuwe klant is actief, standaard plan free
  static create(
    input: {
      readonly id: CustomerId;
      readonly accountId: AccountId;
      readonly name: CustomerName;
      readonly email: Email;
      readonly plan?: PlanCode;
    },
    now: DateTime.Utc,
  ): Customer {
    return new Customer({ ...input, createdAt: now, updatedAt: now });
  }

  update(
    changes: { readonly name?: CustomerName; readonly email?: Email },
    now: DateTime.Utc,
  ) {
    this.ensureActive();
    return Effect.succeed(
      new Customer({ ...this, ...changes, updatedAt: now }),
    );
  }

  cancel(now: DateTime.Utc) {
    this.ensureActive();
    return Effect.succeed(
      new Customer({
        ...this,
        status: "canceled",
        canceledAt: now,
        updatedAt: now,
      }),
    );
  }

  private ensureActive() {
    return this.status === "canceled"
      ? Effect.fail(new CustomerCancelled({ id: this.id }))
      : Effect.void;
  }
}
