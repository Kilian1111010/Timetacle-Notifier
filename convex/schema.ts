import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notifications: defineTable({
    notifiedToday: v.boolean(),
    lastNotified: v.number(),
  }),
  
  settings: defineTable({
    callmebotApiKey: v.string(),
    phoneNumber: v.string(),
    bookingUrl: v.string(),
    timacleUrl: v.string(),
    debug: v.boolean(),
  }),
});