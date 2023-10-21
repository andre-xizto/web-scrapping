import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Parametros } from './parametros';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
constructor(private readonly scrapperService: ScrapperService) {}

    @HttpCode(200)
    @Post('scrape')
    getEvents (@Body() corpo: Parametros) {       
        return this.scrapperService.scrape(corpo.url, corpo.dateSelector, corpo.eventContainerSelector, corpo.imageSelector, corpo.locationSelector, corpo.titleSelector);
    }
}
