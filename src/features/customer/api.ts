import { Effect, Schema } from "effect";
import { HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi";
import { PlanCode } from "../plan/schema";
import { Customer, CustomerId, CustomerName, Email, Status } from "./schema";
import { EmailAlreadyTaken } from "./errors";

// De klant zoals de client hem ziet: zonder accountId
const { accountId: _accountId, ...publicFields } = Customer.fields;
export const CustomerResponse = Schema.Struct(publicFields);

// Eén pagina uit de lijst; next is null als er geen volgende pagina is
export const CustomerPage = Schema.Struct({
  data: Schema.Array(CustomerResponse),
  next: Schema.NullOr(CustomerId),
});

// Query-parameters zijn strings: omzetten naar een getal, dan controleren
const Limit = Schema.NumberFromString.pipe(
  Schema.check(Schema.isInt(), Schema.isBetween({ minimum: 1, maximum: 100 })),
);

const CreateCustomer = Schema.Struct({
  name: CustomerName,
  email: Email,
  plan: Schema.optional(PlanCode),
});

export class CustomerGroup extends HttpApiGroup.make("customers").add(
  HttpApiEndpoint.get("list", "/customers", {
    query: {
      plan: Schema.optional(PlanCode),
      status: Schema.optional(Status),
      limit: Limit.pipe(Schema.withDecodingDefaultKey(Effect.succeed("20"))),
      cursor: Schema.optional(CustomerId),
    },
    success: CustomerPage,
  }),
  HttpApiEndpoint.post("create", "/customers", {
    payload: CreateCustomer,
    success: CustomerResponse.annotate({ httpApiStatus: 201 }),
    error: EmailAlreadyTaken,
  }),
) {}
