import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Patient } from "./entities/patient.entity";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientSchema } from "./Schemas/patient.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
