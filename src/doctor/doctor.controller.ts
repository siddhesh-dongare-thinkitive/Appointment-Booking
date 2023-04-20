import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./Dto/createDoctor.dto";

@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorsService.createDoctor(createDoctorDto);
  }

  @Get()
  findAllDoctor() {
    return this.doctorsService.findAllDoctor();
  }

  @Get("/:id")
  findDoctor(@Param("id") id: string) {
    return this.doctorsService.findDoctorById(id);
  }

  @Get("/:email")
  findDoctorByEmail(@Param("email") email: string) {
    return this.doctorsService.findDoctorById(email);
  }
}
