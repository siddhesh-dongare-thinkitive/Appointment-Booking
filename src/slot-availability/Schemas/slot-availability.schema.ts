import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type SlotAvailabilityDocument = SlotAvailability & Document;

@Schema({ versionKey: false, timestamps: true })
export class SlotAvailability {
  @Prop()
  date: Date;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" })
  doctor: mongoose.Types.ObjectId;
}
export const SlotAvailabilitySchema =
  SchemaFactory.createForClass(SlotAvailability);
