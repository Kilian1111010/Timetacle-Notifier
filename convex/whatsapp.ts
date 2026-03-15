import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const sendWhatsApp = internalAction({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.runQuery(internal.settings.getSettings);
    if (!settings || !settings.callmebotApiKey || !settings.phoneNumber) {
      if (settings?.debug) console.log("WhatsApp Settings nicht gesetzt.");
      return "Settings not configured";
    }

    const API_KEY = settings.callmebotApiKey;
    const NUMBER = settings.phoneNumber;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${NUMBER}&text=${encodeURIComponent(args.message)}&apikey=${API_KEY}`;

    if (settings.debug) console.log(`Sending WhatsApp to ${NUMBER}`);

    const res = await fetch(url);
    const result = await res.text();
    return result;
  },
});
