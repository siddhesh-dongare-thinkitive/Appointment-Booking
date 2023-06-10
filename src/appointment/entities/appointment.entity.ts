import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Doctor } from "src/doctor/Scheams/doctor.schema";
import { Patient } from "src/patient/Schemas/patient.schemas";
import { Session } from "src/session/Schemas/session.schema";

export class Appointment {
  @IsNotEmpty()
  session: Session;

  @IsNotEmpty()
  doctor: Doctor;

  @IsNotEmpty()
  patient: Patient;

  @IsNotEmpty()
  @IsString()
  status: string;
}
