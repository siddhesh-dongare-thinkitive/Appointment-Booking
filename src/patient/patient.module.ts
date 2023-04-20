import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Patient } from "./entities/patient.entity";
import { PatientController } from "./patient.controller";
import { PatientRepository } from "./patient.repository";
import { PatientService } from "./patient.service";
import { PatientSchema } from "./Schemas/patient.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
})
export class PatientModule {}
