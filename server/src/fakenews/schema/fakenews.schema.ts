import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Newsdata } from './newsdata.schema';
import { Reaction } from './reaction.schema';

@Schema()
export class FakeNews extends Document {
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Newsdata"})
    reference: Newsdata

    @Prop()
    uuid: string;

    @Prop()
    ord_in_thread: number;

    @Prop()
    author: string;

    @Prop()
    published: Date;

    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop()
    language: string;

    @Prop()
    crawled: Date;

    @Prop()
    thread_title: string;

    @Prop()
    replies_count: number;

    @Prop()
    participants_count: number;

    @Prop([{type:mongoose.Schema.Types.ObjectId, ref: "Reaction"}])
    likes: Reaction[];

    @Prop()
    comments: [];

    @Prop()
    type: string;
}

export const FakeNewsSchema = SchemaFactory.createForClass(FakeNews);