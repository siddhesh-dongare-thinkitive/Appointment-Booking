// patient.model.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  appointments: [
    {
      doctorId: any;
      date: Date;
      startTime: string;
      endTime: string;
    }
  ];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
