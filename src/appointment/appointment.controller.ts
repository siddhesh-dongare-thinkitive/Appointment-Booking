import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./Dto/createAppointment.dto";

@Controller("appointment")
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentService.createAppointment(
      createAppointmentDto
    );
  }

  @Get()
  async GetAllAppointments() {
    return await this.appointmentService.getAllAppointments();
  }

  @Get("/:id")
  async finsAppointmentById(@Param("id") id: string) {
    return await this.appointmentService.findAppointmentById(id);
  }
}
