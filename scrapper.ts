import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer';

export async function scrapeEvents(url: string, eventContainerSelector: string, titleSelector: string, dateSelector: string, locationSelector: string, imageSelector: string) {
  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(url);

    const eventsContainers = await page.$$(eventContainerSelector);

    const events = [];

    for (const event of eventsContainers) {
      const title = await event.$eval(titleSelector, (item) => item ? item.textContent : '');
      const dateContainer = await event.$(dateSelector);
      const datesText = dateContainer ? await page.evaluate((element) => element.textContent, dateContainer) : '';
      const dates = datesText ? datesText.match(/\d{1,2} [A-Za-z]{3}/g) : null;

      const location = await event.$eval(locationSelector, (item) => item ? item.textContent : '');
      const image = await event.$eval(imageSelector, (item) => item ? item.getAttribute('src') : '');

      events.push({
        title,
        dates,
        location,
        image
      });
    }

    await browser.close();

    return events;
  } catch (error) {
    throw new Error(error);
  }
}
