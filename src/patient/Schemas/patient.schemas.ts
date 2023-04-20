import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PatientDocument = Patient & Document;

@Schema({ versionKey: false, timestamps: true })
export class Patient {
  @Prop({ required: true, index: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  type: string;

  //   @Prop({ type: Types.ObjectId, ref: "Appointment" })
  //   appointments: Types.ObjectId[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
