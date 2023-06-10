import { IsString } from "class-validator";

export class BookAppointmentDto {
  @IsString()
  doctorId: string;

  @IsString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
