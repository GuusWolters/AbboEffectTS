import { Schema, SchemaTransformation } from "effect";

export const CustomerId = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^cu_[a-z0-9_]+$/)),
  Schema.brand("CustomerId"),
);
export type CustomerId = typeof CustomerId.Type;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trimAndLower = SchemaTransformation.composeTransformation(
  SchemaTransformation.trim(),
  SchemaTransformation.toLowerCase(),
);
export const Email = Schema.String.pipe(
  Schema.decode(trimAndLower),
  Schema.check(Schema.isPattern(EMAIL)),
  Schema.brand("Email"),
);
export type Email = typeof Email.Type;

export const CustomerName = Schema.Trim.pipe(
  Schema.check(Schema.isMinLength(2), Schema.isMaxLength(100)),
  Schema.brand("CustomerName"),
);
export type CustomerName = typeof CustomerName.Type;

export const Status = Schema.Literals(["active", "canceled"]);
export type Status = typeof Status.Type;
