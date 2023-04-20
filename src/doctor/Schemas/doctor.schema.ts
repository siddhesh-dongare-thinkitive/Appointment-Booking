import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type DoctorDocument = Doctor & Document;

@Schema({ versionKey: false, timestamps: true })
export class Doctor {
  @Prop({ required: true, index: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  spec: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: "SlotAvailability" })
  slotAvailabilities: Types.ObjectId[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
