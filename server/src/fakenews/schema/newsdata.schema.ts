import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Newsdata extends Document {
  @Prop()
  uuid: string;

  @Prop()
  site_url: string;

  @Prop()
  country: string;

  @Prop()
  spam_score: number;
}

export const NewsdataSchema = SchemaFactory.createForClass(Newsdata);
