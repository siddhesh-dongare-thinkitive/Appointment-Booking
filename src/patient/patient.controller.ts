import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePatientDto } from "./Dto/createPatient.dto";
import { PatientService } from "./patient.service";

@Controller("patient")
export class PatientController {
  constructor(private patientService: PatientService) {}
  @Post()
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.createPatient(createPatientDto);
  }

  @Get("/:name")
  async findPatientByName(@Param("name") name: string) {
    return await this.patientService.findPatientByName(name);
  }
}
