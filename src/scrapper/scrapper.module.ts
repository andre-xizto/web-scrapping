import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';

@Module({
  providers: [ScrapperService],
  controllers: [ScrapperController],
  exports: [ScrapperModule]
})
export class ScrapperModule {}
