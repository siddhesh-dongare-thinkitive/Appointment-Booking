import { Injectable, NotFoundException } from "@nestjs/common";
import { DoctorsRepository } from "./doctor.repository";

@Injectable()
export class DoctorService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async createDoctor(createDoctorDto): Promise<any> {
    const doctor = await this.doctorsRepository.createOne(createDoctorDto);
    return doctor;
  }

  async findAllDoctor(): Promise<any> {
    const doctor = this.doctorsRepository.findAll();
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }

  async findDoctorByEmail(email): Promise<any> {
    const doctor = this.doctorsRepository.findOne(email);
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }

  async findDoctorById(doctor_id): Promise<any> {
    console.log("DoctorId", doctor_id);
    const doctor = await this.doctorsRepository.findOneById(doctor_id);
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    console.log(doctor.schedule);
    return doctor;
  }

  async updateAppointment(doctor_id, appointment_id): Promise<any> {
    const doctor = await this.findDoctorById(doctor_id);
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
