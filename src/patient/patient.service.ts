// patient.service.ts

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookAppointmentDto } from "./Dto/book-appointment.dto";
import { CreatePatientDto } from "./Dto/createPatient.dto";
import { UpdatePatientDto } from "./Dto/update-patient.dto";
import { Patient, PatientDocument } from "./Schemas/patient.schemas";
import { Doctor, DoctorDocument } from "../doctor/Schemas/doctor.schema";
import { log } from "util";
import { start } from "repl";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient> {
    return this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto
  ): Promise<Patient> {
    return this.patientModel.findByIdAndUpdate(id, updatePatientDto, {
      new: true,
    });
  }

  async bookAppointment(
    patientId: string,
    bookAppointmentDto: BookAppointmentDto
  ): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(bookAppointmentDto.doctorId);
    // console.log(">>>>>>>>>>>>>>>>>><<<<<<<",doctor.availability)
    // // if (!doctor) {
    // //   throw new NotFoundException("Doctor not found");
    // // }

    const date = new Date(bookAppointmentDto.date);
    const startTime = bookAppointmentDto.startTime;
    const endTime = bookAppointmentDto.endTime;
    console.log("UserDate:", date);

    const availabilityDay = doctor.availability.find(
      (day) => day.date.getDate() === date.getDate()
    );

    if (!availabilityDay) {
      throw new BadRequestException("Doctor not available on this day");
    }

    const slot = availabilityDay.slots.find((s) => {
      const slotStartTime = new Date(s.startTime);
      const slotEndTime = new Date(s.endTime);
      const combinedDateTime = new Date(
        availabilityDay.date.getFullYear(),
        availabilityDay.date.getMonth(),
        availabilityDay.date.getDate(),
        slotStartTime.getHours(),
        slotStartTime.getMinutes()
      );

      if (s.booked === false) {
        const date = bookAppointmentDto.date;
        const startTime = bookAppointmentDto.startTime;
        const endTime = bookAppointmentDto.endTime;

        const [startHours, startMinutes] = startTime.split(":");
        const timeStartDate = new Date(date);
        timeStartDate.setHours(+startHours, +startMinutes, 0);

        const timeZoneOffsetStart = timeStartDate.getTimezoneOffset();
        const adjustedTimeStartDate = new Date(
          timeStartDate.getTime() - timeZoneOffsetStart * 60 * 1000
        );
        const [endHours, endMinutes] = endTime.split(":");
        const timeEndDate = new Date(date);
        timeEndDate.setHours(+endHours, +endMinutes, 0);

        const timeZoneOffsetEnd = timeEndDate.getTimezoneOffset();
        const adjustedTimeEndDate = new Date(
          timeEndDate.getTime() - timeZoneOffsetEnd * 60 * 1000
        );

        return (
          slotStartTime.getTime() ===
            new Date(adjustedTimeStartDate).getTime() &&
          s.booked === false &&
          slotEndTime.getTime() === new Date(adjustedTimeEndDate).getTime()
        );
      } else {
        throw new BadRequestException("Slot is already booked");
      }
    });

    if (!slot) {
      throw new BadRequestException("Slot not available");
    }

    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException("Patient not found");
    }

    const appointment = {
      doctorId: doctor.id,
      date,
      startTime: startTime,
      endTime: endTime,
    };
    patient.appointments.push(appointment);

    slot.booked = true;
    slot.patientId = patientId;
    const updatedDoctor = new this.doctorModel(doctor);
    updatedDoctor.availability = doctor.availability;

    try {
      await patient.save();
      updatedDoctor.markModified("availability");
      await updatedDoctor.save();
    } catch (error) {
      throw error;
    }
    return updatedDoctor;
  }
}
