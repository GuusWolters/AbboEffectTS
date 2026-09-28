import { HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi";
import { CustomerId } from "./values";
import {
  CustomerCancelled,
  CustomerNotFound,
  EmailAlreadyTaken,
} from "./errors";
import {
  CreateCustomer,
  CustomerPage,
  CustomerResponse,
  ListCustomer,
  UpdateCustomer,
} from "./dto";
// import { InvalidUpgrade } from "../plan/errors";
// import { Event } from "./schema.event";

export class CustomerGroup extends HttpApiGroup.make("customers")
  .add(
    HttpApiEndpoint.get("list", "/", {
      query: ListCustomer,
      success: CustomerPage,
    }),
    HttpApiEndpoint.post("create", "/", {
      payload: CreateCustomer,
      success: CustomerResponse.annotate({ httpApiStatus: 201 }),
      error: EmailAlreadyTaken,
    }),
    HttpApiEndpoint.get("get", "/:id", {
      params: { id: CustomerId },
      success: CustomerResponse,
      error: CustomerNotFound,
    }),
    HttpApiEndpoint.patch("update", "/:id", {
      params: { id: CustomerId },
      success: CustomerResponse,
      error: [CustomerNotFound, CustomerCancelled, EmailAlreadyTaken],
      payload: UpdateCustomer,
    }),
    // HttpApiEndpoint.post("upgrade", "/:id/upgrade", {
    //   params: { id: CustomerId },
    //   success: CustomerResponse,
    //   error: [CustomerNotFound, CustomerCancelled, InvalidUpgrade],
    //   payload: Schema.Struct({ plan: PlanCode }),
    // }),
    // HttpApiEndpoint.post("cancel", "/:id/cancel", {
    //   params: { id: CustomerId },
    //   success: CustomerResponse,
    //   error: [CustomerNotFound, CustomerCancelled],
    // }),
    // HttpApiEndpoint.get("events", "/:id/events", {
    //   params: { id: CustomerId },
    //   success: Schema.Array(Event),
    //   error: [CustomerNotFound],
    // }),
  )
  .prefix("/customers") {}
