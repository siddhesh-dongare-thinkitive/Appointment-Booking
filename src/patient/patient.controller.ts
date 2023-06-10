import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Doctor } from "src/doctor/Schemas/doctor.schema";
import { BookAppointmentDto } from "./Dto/book-appointment.dto";
import { CreatePatientDto } from "./Dto/createPatient.dto";
import { UpdatePatientDto } from "./Dto/update-patient.dto";
import { PatientService } from "./patient.service";
import { Patient } from "./Schemas/patient.schemas";

@Controller("patients")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePatientDto: UpdatePatientDto
  ): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  @Post(":id/appointments")
  async bookAppointment(
    @Param("id") patientId: string,
    @Body() bookAppointmentDto: BookAppointmentDto
  ): Promise<Doctor> {
    return this.patientService.bookAppointment(patientId, bookAppointmentDto);
  }
}
