import { Module } from '@nestjs/common'
import { QuoteController } from './controllers/quote.controller'
import { QuoteService } from './services/quote.service'

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
