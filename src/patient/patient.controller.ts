import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePatientDto } from "./Dto/createPatient.dto";
import { PatientService } from "./patient.service";

@Controller("patient")
export class PatientController {
  constructor(private patientService: PatientService) {}
  @Post()
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    console.log("Yeahhh");
    return await this.patientService.createPatient(createPatientDto);
  }

  @Get("/:email")
  async findPatientByEmail(@Param("email") email: string) {
    return await this.patientService.findPatientByEmail(email);
  }
}
