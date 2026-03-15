import { internalQuery } from "./_generated/server";

export const getSettings = internalQuery({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings;
  },
});