import nodeCron from "node-cron";
import { getTitle } from "./lib/scrape/index.js";
import { config } from "dotenv";

config();
// Start the scraping
// NOTE : https://crontab.guru/#0_18_*_*_*
const job = nodeCron.schedule("0 18 * * *", getTitle);

job.start();