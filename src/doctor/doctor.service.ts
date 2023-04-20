import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateDoctorDto } from "./Dto/createDoctor.dto";
import { DoctorDocument } from "./Schemas/doctor.schema";

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel("Doctor")
    private doctorsRepository: Model<DoctorDocument>
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<any> {
    const doctor = await this.doctorsRepository.create(createDoctorDto);
    return doctor;
  }

  async findAllDoctor(): Promise<any> {
    const doctor = await this.doctorsRepository
      .find()
      .populate("slotAvailabilities");

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }

  async findDoctorByEmail(email): Promise<any> {
    const doctor = this.doctorsRepository.findOne({ email: email });
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }

  async findDoctorById(doctor_id): Promise<any> {
    console.log("DoctorId", doctor_id);
    const doctor = await this.doctorsRepository
      .findOne({ _id: doctor_id })
      .populate("slotAvailabilities");
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }

  async updateAppointment(doctor_id, appointment_id): Promise<any> {
    const doctor = await this.doctorsRepository
      .findOne({ _id: doctor_id })
      .populate("slotAvailabilities");
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    const updatedDoctor = this.doctorsRepository.updateOne(
      doctor._id,
      appointment_id
    );
    return updatedDoctor;
  }
}
