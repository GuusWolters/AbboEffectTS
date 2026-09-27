import { Schema } from "effect";
import { CustomerId, Email } from "./schema";

export class CustomerCancelled extends Schema.TaggedError<CustomerCancelled>()(
  "CustomerCancelled",
  { id: CustomerId },
  { httpApiStatus: 409 },
) {}

export class CustomerNotFound extends Schema.TaggedError<CustomerNotFound>()(
  "CustomerNotFound",
  { id: CustomerId },
  { httpApiStatus: 404 },
) {}

export class EmailAlreadyTaken extends Schema.TaggedError<EmailAlreadyTaken>()(
  "EmailAlreadyTaken",
  { email: Email },
  { httpApiStatus: 409 },
) {}
