import { PublicQuoteController, PrivateQuoteController } from './controllers'
import { SessionModule } from '../session/session.module'
import { QuoteService } from './services/quote.service'
import { MongooseModule } from '@nestjs/mongoose'
import { QuoteRepository } from './repositories'
import { Quote, QuoteSchema } from './schemas'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]), SessionModule],
  exports: [QuoteService, QuoteRepository],
  controllers: [PublicQuoteController, PrivateQuoteController],
  providers: [QuoteService, QuoteRepository],
})
export class QuoteModule {}
