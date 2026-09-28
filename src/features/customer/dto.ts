import { Schema } from "effect";
import { Customer, CustomerName } from "./schema.customer";
import { CustomerId, Email } from "./values";
import { PlanCode } from "../plan/schema";

// De klant zoals de client hem ziet: zonder accountId
const { accountId: _accountId, ...publicFields } = Customer.fields;
export const CustomerResponse = Schema.Struct(publicFields);

// Eén pagina uit de lijst; next is null als er geen volgende pagina is
export const CustomerPage = Schema.Struct({
  data: Schema.Array(CustomerResponse),
  next: Schema.NullOr(CustomerId),
});

// Query-parameters zijn strings: omzetten naar een getal, dan controleren
export const Limit = Schema.NumberFromString.pipe(
  Schema.check(Schema.isInt(), Schema.isBetween({ minimum: 1, maximum: 100 })),
);

export const CreateCustomer = Schema.Struct({
  name: CustomerName,
  email: Email,
  plan: Schema.optional(PlanCode),
});

export const UpdateCustomer = Schema.Struct({
  name: Schema.optional(CustomerName),
  email: Schema.optional(Email),
});
