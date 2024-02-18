import { Module } from '@nestjs/common';
import { FakeNewsService } from './fake.news.service';
import { FakeNewsController } from './fake.news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FakeNewsSchema } from './schema/fakenews.schema';
import { NewsdataSchema } from './schema/newsdata.schema';
import { ReactionSchema } from './schema/reaction.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "FakeNews", schema: FakeNewsSchema }]),
    MongooseModule.forFeature([{ name: "Newsdata", schema: NewsdataSchema }]),
    MongooseModule.forFeature([{ name: "Reaction", schema: ReactionSchema }]),
    
  ],
  controllers: [FakeNewsController],
  providers: [FakeNewsService],
})
export class NewsModule { }
