import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { SlotAvailability } from "src/slot-availability/Schemas/slot-availability.schema";
// import { Appointment } from "./appointment.schema";

export type SessionDocument = Session & Document;

@Schema({ versionKey: false, timestamps: true })
export class Session {
  //   @Prop({ type: Types.ObjectId, ref: "Appointment" })
  //   appointment: Appointment;

  @Prop({ type: Types.ObjectId, ref: "SlotAvailability" })
  slot: SlotAvailability;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
