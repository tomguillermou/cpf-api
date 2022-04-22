import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { User } from 'src/users';

@Schema({ timestamps: true })
export class Lead {
    _id?: Types.ObjectId;

    // personal details

    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phonenumber: string;

    // professional activity

    @Prop({ required: true })
    employed: boolean;

    @Prop({ required: true, enum: ['public', 'private', 'none'] })
    sector: string;

    // training

    @Prop({ required: true })
    trained: boolean;

    @Prop({ required: true })
    connected: boolean;

    @Prop({ required: true })
    budget: number;

    // misc

    @Prop({ required: true })
    account: boolean;

    // prospector

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    prospector: User;
}

export type LeadDocument = Lead & Document;

export const LeadSchema = SchemaFactory.createForClass(Lead);
