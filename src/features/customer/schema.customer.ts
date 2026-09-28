import { DateTime, Effect, Schema } from "effect";
import { AccountId } from "../account/schema";
import { PlanCode } from "../plan/schema";
import { CustomerCancelled } from "./errors";
import { CustomerId, Email } from "./values";

// BR-5: alleen trimmen, hoofdletters blijven zoals ze zijn
export const CustomerName = Schema.Trim.pipe(
  Schema.check(Schema.isMinLength(2), Schema.isMaxLength(100)),
  Schema.brand("CustomerName"),
);
export type CustomerName = typeof CustomerName.Type;

export const Status = Schema.Literals(["active", "canceled"]);
export type Status = typeof Status.Type;

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

  // BR-6: een opgezegde klant kan niet worden gewijzigd
  update(
    changes: { readonly name?: CustomerName; readonly email?: Email },
    now: DateTime.Utc,
  ) {
    if (this.status === "canceled") {
      return Effect.fail(new CustomerCancelled({ id: this.id }));
    }
    return Effect.succeed(
      new Customer({ ...this, ...changes, updatedAt: now }),
    );
  }

  // BR-8: opzeggen kan maar één keer
  cancel(now: DateTime.Utc) {
    if (this.status === "canceled") {
      return Effect.fail(new CustomerCancelled({ id: this.id }));
    }
    return Effect.succeed(
      new Customer({
        ...this,
        status: "canceled",
        canceledAt: now,
        updatedAt: now,
      }),
    );
  }
}
