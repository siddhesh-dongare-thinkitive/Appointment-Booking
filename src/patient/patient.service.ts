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
    // console.log(availabilityDay.slots);

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
      // console.log(combinedDateTime);

      if (s.booked === false) {
        // console.log(startTime, endTime);
        // const timeStart = new Date(startTime);
        // const timeEnd = new Date(endTime);
        // console.log(timeStart, timeEnd);

        const currentDate = date;

        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        console.log(startHours, startMinutes);
        console.log(endHours, endMinutes);
        console.log("Date:", date);

        const timeStartDate = new Date(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          startHours,
          startMinutes,
          0
        );
        console.log("dateFinal:", date);

        const startDateString = `${bookAppointmentDto.date}`;
        const endDateString = `${date}T${endTime}:00.000Z`;

        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        console.log(startDate);

        const timeEndDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          endHours,
          endMinutes,
          0
        );

        console.log(slotStartTime, "===", timeStartDate);

        if (slotStartTime === timeStartDate) {
          console.log("We are equal");
        }
        // const timeStartDate = "2023-06-09T01:15:00.000Z";
        // const timeEndDate = "2023-06-09T01:30:00.000Z";

        return (
          slotStartTime.getTime() === new Date(timeStartDate).getTime() &&
          s.booked === false &&
          slotEndTime.getTime() === new Date(timeEndDate).getTime()
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
