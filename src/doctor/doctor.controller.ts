import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./Dto/createDoctor.dto";
import { SetAvailabilityDto } from "./Dto/slot-availability.dto";
import { UpdateDoctorDto } from "./Dto/update-doctor.dto";
import { Doctor } from "./Schemas/doctor.schema";
// import { DoctorService } from "./doctor.service";
// import { CreateDoctorDto } from "./dto/create-doctor.dto";
// import { UpdateDoctorDto } from "./dto/update-doctor.dto";
// import { SetAvailabilityDto } from "./dto/set-availability.dto";
// import { Doctor } from "./doctor.model";

@Controller("doctors")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ): Promise<Doctor> {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Post(":id/availability")
  setAvailability(
    @Param("id") id: string,
    @Body() setAvailabilityDto: SetAvailabilityDto
  ): Promise<Doctor> {
    return this.doctorService.setAvailability(id, setAvailabilityDto);
  }
}
