// create-doctor.dto.ts

import { IsString, IsEmail, IsOptional } from "class-validator";

export class CreateDoctorDto {
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

  @IsString()
  @IsOptional()
  specialty?: string;
}
