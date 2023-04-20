import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientRepository } from "./patient.repository";

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(CreatePatientDto): Promise<any> {
    const patient = await this.patientRepository.createOne(CreatePatientDto);
    return patient;
  }

  async findPatientByEmail(email): Promise<any> {
    const patient = this.patientRepository.findOne(email);
    if (!patient) {
      throw new NotFoundException("Patient not found");
    }
    return patient;
  }

  //   async updateAppointment(patient, appointment): Promise<any> {
  //     const updatedPatient = this.patientRepository.updateOne(patient, appointment);
  //     if (!updatedPatient) {
  //       throw new NotFoundException("Patient not found");
  //     }
  //     return updatedPatient;
  //   }

  //   async removeAppointment(patient, appointment): Promise<any> {
  //     const updatedPatient = this.patientRepository.removeOne(patient, appointment);
  //     if (!updatedPatient) {
  //       throw new NotFoundException("Patient not found");
  //     }
  //     return updatedPatient;
  //   }
}
