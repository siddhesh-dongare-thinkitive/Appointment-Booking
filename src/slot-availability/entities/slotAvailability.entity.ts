import { IsDate, IsNotEmpty } from "class-validator";
import { Doctor } from "src/doctor/Schemas/doctor.schema";

export class SlotAvailability {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsDate()
  startTime: string;

  @IsNotEmpty()
  @IsDate()
  endTime: string;

  @IsNotEmpty()
  doctor: Doctor;
}
