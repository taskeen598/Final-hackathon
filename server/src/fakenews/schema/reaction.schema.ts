import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from '../../auth/schema/user.schemas';
import { FakeNews } from './fakenews.schema';

export type ReactionDocument = HydratedDocument<Reaction>;

@Schema({
    timestamps: true
})

export class Reaction extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "FakeNews" })
    fakenews: FakeNews

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);