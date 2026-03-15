import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "check-timeacle-5min",
  { minutes: 5 },
  internal.checkTimacle.checkTimeacle,
  {}
);

export default crons;
