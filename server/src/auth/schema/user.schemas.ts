import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: [true, "Duplicate email enter"] })
    email: string;
   
    @Prop()
    password: string;

    @Prop()
    profileImage:string
}

export const UserSchema = SchemaFactory.createForClass(User);