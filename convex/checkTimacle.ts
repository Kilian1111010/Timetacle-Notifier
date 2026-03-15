import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const checkTimeacle = internalAction({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.runQuery(internal.settings.getSettings);
    if (!settings || !settings.callmebotApiKey || !settings.phoneNumber || !settings.bookingUrl || !settings.timacleUrl || settings.debug === undefined) {
      if (settings?.debug) console.log("Settings nicht vollständig gesetzt, überspringe Check.");
      return { ok: false, reason: "Settings not fully configured" };
    }

    if (settings.debug) console.log("🔍 Timeacle Check gestartet...");

    const TIMEACLE_URL = settings.timacleUrl;
    const BOOKING_URL = settings.bookingUrl;

    const res = await fetch(TIMEACLE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": BOOKING_URL,
      },
    });

    const data = await res.json();
    const hasFreeSlots = (data.firstBookableTimes?.length || 0) > 0;

    const notifications = await ctx.runQuery(
      internal.notifications.getTodayNotifications
    );
    const alreadyNotified = notifications.length > 0;

    if (settings.debug) console.log(
      `Checked Timeacle: ${hasFreeSlots ? "Slots available!" : "No slots."} Already notified today: ${alreadyNotified}`
    );

    if (hasFreeSlots && !alreadyNotified) {
      if (settings.debug) console.log("🚨 Termin frei! WhatsApp wird gesendet...");

      await ctx.scheduler.runAfter(0, internal.whatsapp.sendWhatsApp, {
        message: `🚨 FÜHRERSCHEIN TERMIN FREI!\n\n${data.firstBookableTimes.length} Slots verfügbar!\n\nJetzt buchen:\n${BOOKING_URL}`,
      });

      await ctx.runMutation(internal.notifications.setNotificationFlag);
      if (settings.debug) console.log("✅ WhatsApp gesendet + Flag gesetzt");
    }

    return { ok: true, hasFreeSlots, alreadyNotified };
  },
});
