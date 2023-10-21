// scrapper.d.ts
declare module 'scrapper' {
    export function scrapeEvents(url: string, eventContainerSelector: string, titleSelector: string, dateSelector: string, locationSelector: string, imageSelector: string): Promise<any[]>;
  }
  