import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PatientDocument } from "./Schemas/patient.schemas";

export class PatientRepository {
  constructor(
    @InjectModel("Patient")
    private patientModel: Model<PatientDocument>
  ) {}

  async createOne(patient): Promise<any> {
    const result = await this.patientModel.create(patient);
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.patientModel.findOne({ email: email });
    return result;
  }

  async updateOne(patient, appointment): Promise<any> {
    const result = await this.patientModel.updateOne(
      { _id: patient },
      { $push: { appointments: appointment } }
    );
    return result;
  }

  async removeOne(patient, appointment): Promise<any> {
    const result = await this.patientModel.findOneAndUpdate(
      { _id: patient },
      { $pullAll: { appointments: [appointment] } }
    );
    return result;
  }
}
