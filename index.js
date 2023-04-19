import nodeCron from "node-cron";
import { getTitle } from "./lib/scrape/index.js";
import { config } from "dotenv";

config();
// NOTE : https://crontab.guru/#0_21_*_*_*
// NOTE TIMEZONE : https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
const job = nodeCron.schedule("0 21 * * *", getTitle,
  {
    scheduled: true,
    timezone: "Asia/Jakarta"
  });

job.start();