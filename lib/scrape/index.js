import puppeteer from "puppeteer";
import { pushMessage } from "../pushMessage/index.js";
import { desiredMangaTitleList } from "../../constants.js";


export const getTitle = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // Fake an user agent to bypass browser that check headless scrapers
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");

  // On this new page:
  // - open the "https://manganato.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://manganato.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.exposeFunction("pushMessage", pushMessage);

  // Get page data
  await page.evaluate(async ({ desiredMangaTitleList, }) => {

    //NOTE: https://stackoverflow.com/questions/61035043/imported-functions-not-working-in-puppeteer
    await pushMessage();

    const mangaList = document.querySelectorAll(".content-homepage-item-right");

    const iterateableMangaList = Array.from(mangaList);

    for (let index = 0; index < iterateableMangaList.length; index++) {
      const title = iterateableMangaList[index].querySelector(".item-title").querySelector(".a-h").innerText;

      if (desiredMangaTitleList.includes(title)) {
        const chapter = iterateableMangaList[index].querySelector(".item-chapter").querySelector(".text-nowrap").innerText;
        const date = iterateableMangaList[index].querySelector(".item-chapter").getElementsByTagName('i')[0].innerText;
        const url = iterateableMangaList[index].querySelector(".item-chapter").getElementsByTagName("a")[0].getAttribute("href");

        return pushMessage(title, chapter, date, url);
      }
    }

    return 'Not Found';
  }, { desiredMangaTitleList })

  // Close the browser
  await browser.close();
};