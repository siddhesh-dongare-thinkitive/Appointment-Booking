import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PatientDocument } from "./Schemas/patient.schemas";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient")
    private patientModel: Model<PatientDocument>
  ) {}
  async createPatient(CreatePatientDto): Promise<any> {
    const patient = await this.patientModel.create(CreatePatientDto);
    return patient;
  }

  async findPatientByName(name): Promise<any> {
    const patient = this.patientModel
      .findOne({ name: name })
      .populate("patient");
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
