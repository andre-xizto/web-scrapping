import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { scrapeEvents } from '../scrapper';

@Injectable()
export class ScrapperService {
    private readonly Logger = new Logger(ScrapperService.name);

    async scrape(url: string, dateSelector: string, eventContainerSelector: string, imageSelector: string, locationSelector: string, titleSelector: string): Promise<any[]> {
        
        try {
            const response = await scrapeEvents(url, eventContainerSelector, titleSelector, dateSelector, locationSelector, imageSelector)
            return response;
        } catch (error) {
            this.Logger.fatal(error);
            throw new InternalServerErrorException(`Erro: ${error}`);
        }
    }
}
