import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './fakenews/fake.news.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), MongooseModule.forRoot(process.env.MONGO_URI), NewsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
