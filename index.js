import puppeteer from "puppeteer";

const getTitle = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "https://manganato.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://manganato.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const titles = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const mangaList = document.querySelectorAll(".content-homepage-item-right");
    return Array.from(mangaList).map((manga) => {
      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText`)
      const title = manga.querySelector(".item-title").querySelector(".a-h").innerText;
      const chapter = manga.querySelector(".item-chapter").querySelector(".text-nowrap").innerText;
      const date = manga.querySelector(".item-chapter").getElementsByTagName('i')[0].innerText;

      return { title, chapter, date };
    });
  });

  const desiredManga = titles.find(({ title }) => title === "Deep");

  if (desiredManga) {
    // Display the quotes
    console.log(
      {
        title: desiredManga.title,
        chapter: desiredManga.chapter,
        date: desiredManga.date
      });
  }

  // Close the browser
  await browser.close();

};

// Start the scraping
getTitle();