import { Schema } from "effect";
import { CustomerId } from "./values";

export const EventId = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^ev_[a-z0-9_]+$/)),
  Schema.brand("EventId"),
);
export type EventId = typeof EventId.Type;

export const EventType = Schema.Literals([
  "created",
  "updated",
  "upgraded",
  "canceled",
]);
export type EventType = typeof EventType.Type;

export class Event extends Schema.Class<Event>("Event")({
  id: EventId,
  customerId: CustomerId,
  type: EventType,
  at: Schema.DateTimeUtcFromString,
  details: Schema.optional(Schema.JsonObject),
}) {}
