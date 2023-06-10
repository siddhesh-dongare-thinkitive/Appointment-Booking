// create-patient.dto.ts

import { IsString, IsEmail, IsOptional } from "class-validator";

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
