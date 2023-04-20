import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DoctorDocument } from "./Scheams/doctor.schema";

export class DoctorsRepository {
  constructor(
    @InjectModel("Doctor")
    private doctorModel: Model<DoctorDocument>
  ) {}

  async createOne(doctor): Promise<any> {
    const result = await this.doctorModel.create(doctor);
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.doctorModel.findOne({ email: email });
    return result;
  }

  async findAll(): Promise<any> {
    const result = await this.doctorModel.find();
    return result;
  }

  async findOneById(id): Promise<any> {
    const result = await this.doctorModel.findOne({ _id: id });
    return result;
  }

  async updateOne(doctor, appointment): Promise<any> {
    const result = await this.doctorModel.updateOne(
      { _id: doctor },
      { $push: { appointments_accepted: appointment } }
    );
    return result;
  }

  // async findSlotsByDoctorId(id) {
  //    const result = await this.doctorModel.findOne({ _id: id });
  //   return result
  // }
}
