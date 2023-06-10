import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAppointmentDto } from "./Dto/createAppointment.dto";
import { AppointmentDocument } from "./Schemas/appointment.schema";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel("Appointment")
    private appointmentModel: Model<AppointmentDocument>
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      const result = await this.appointmentModel.create(createAppointmentDto);
      return result;
    } catch (err) {
      throw new HttpException((err as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllAppointments(): Promise<any> {
    const result = await this.appointmentModel
      .find()
      .populate(["session", "doctor", "patient"]);
    return result;
  }

  async findAppointmentById(id): Promise<any> {
    const result = this.appointmentModel
      .findOne({ _id: id })
      .populate(["session", "doctor", "patient"]);
    if (!result) {
      throw new NotFoundException("Doctor not found");
    }
    return result;
  }
}
