import { Module } from '@nestjs/common';
import { TelegramService, telegramData } from './telegram.service';
import { TelegramController } from './telegram.controller';

@Module({
  providers: [TelegramService,telegramData],
  controllers:[TelegramController],
})
export class TelegramModule {}
