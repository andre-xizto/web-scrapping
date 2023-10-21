const puppeteer = require('puppeteer');

async function scrapeEvents(url, eventContainerSelector, titleSelector, dateSelector, locationSelector, imageSelector) {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Navegue para a página especificada
    await page.goto(url);

    // Use o método `page.$$` com o seletor CSS fornecido para encontrar os elementos do evento
    const eventTitles = await page.$$(eventContainerSelector);

    const events = [];

    // Itere sobre os elementos encontrados e colete as informações
    for (const event of eventTitles) {
      const title = await event.$eval(titleSelector, (item) => item ? item.textContent : ''); // Verificação adicionada
      const dateContainer = await event.$(dateSelector);
      const datesText = dateContainer ? await page.evaluate((element) => element.textContent, dateContainer) : ''; // Verificação adicionada
      const dates = datesText ? datesText.match(/\d{1,2} [A-Za-z]{3}/g) : null; // Verificação adicionada

      const location = await event.$eval(locationSelector, (item) => item ? item.textContent : ''); // Verificação adicionada
      const image = await event.$eval(imageSelector, (item) => item ? item.getAttribute('src') : ''); // Verificação adicionada

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

module.exports = {
  scrapeEvents
};
