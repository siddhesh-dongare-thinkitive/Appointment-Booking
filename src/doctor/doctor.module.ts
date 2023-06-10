import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { Doctor, DoctorSchema } from "./Schemas/doctor.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
