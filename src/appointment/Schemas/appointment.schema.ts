import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AppointmentDocument = Appointment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: "Session" })
  session: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Doctor" })
  doctor: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Patient" })
  patient: Types.ObjectId[];

  @Prop({ default: "Pending" })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
