// doctor.model.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  create() {
    throw new Error("Method not implemented.");
  }
  save() {
    throw new Error("Method not implemented.");
  }
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  specialty: string;

  @Prop()
  availability: [
    {
      date: Date;
      slots: Array<{
        startTime: Date;
        endTime: Date;
        booked: boolean;
        patientId: any;
      }>;
    }
  ];
  id: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
