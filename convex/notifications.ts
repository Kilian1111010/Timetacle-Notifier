import { internalQuery, internalMutation } from "./_generated/server";

export const getTodayNotifications = internalQuery({
  args: {},
  handler: async (ctx) => {
    const yesterday = Date.now() - 24 * 60 * 60 * 1000;
    return await ctx.db
      .query("notifications")
      .filter((q) => q.gt(q.field("lastNotified"), yesterday))
      .collect();
  },
});

export const setNotificationFlag = internalMutation({
  args: {},
  handler: async (ctx) => {
    await ctx.db.insert("notifications", {
      notifiedToday: true,
      lastNotified: Date.now(),
    });
  },
});
