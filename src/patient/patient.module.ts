import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoctorModule } from "src/doctor/doctor.module";
import { DoctorService } from "src/doctor/doctor.service";
import { Doctor, DoctorSchema } from "src/doctor/Schemas/doctor.schema";
import { Patient } from "./entities/patient.entity";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientSchema } from "./Schemas/patient.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    // DoctorModule,
  ],
  controllers: [PatientController],
  providers: [PatientService, DoctorService],
})
export class PatientModule {}
