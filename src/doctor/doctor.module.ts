import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoctorController } from "./doctor.controller";
import { DoctorsRepository } from "./doctor.repository";
import { DoctorService } from "./doctor.service";
import { Doctor, DoctorSchema } from "./Scheams/doctor.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorsRepository],
})
export class DoctorModule {}
