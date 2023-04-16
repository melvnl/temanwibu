import puppeteer from "puppeteer";
import nodeCron from "node-cron";
import { getTitle } from "./lib/scrap";

// Start the scraping
// NOTE : https://crontab.guru/#0_12_*_*_FRI
const job = nodeCron.schedule("0 12 * * FRI", getTitle());