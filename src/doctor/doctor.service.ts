import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateDoctorDto } from "./Dto/createDoctor.dto";
import { SetAvailabilityDto } from "./Dto/slot-availability.dto";
import { UpdateDoctorDto } from "./Dto/update-doctor.dto";
import { Doctor, DoctorDocument } from "./Schemas/doctor.schema";

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const createdDoctor = new this.doctorModel(createDoctorDto);
    return createdDoctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findOne(id: string): Promise<Doctor> {
    return (await this.doctorModel.findById(id)).populate("availability");
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
      new: true,
    });
  }

  async setAvailability(
    id: string,
    setAvailabilityDto: SetAvailabilityDto
  ): Promise<Doctor> {
    console.log(setAvailabilityDto);

    const doctor = await this.doctorModel.findById(id).exec();
    const date = new Date(setAvailabilityDto.date);
    const slots = setAvailabilityDto.slots;
    console.log(slots);

    let availabilityIndex = doctor.availability.findIndex(
      (day) => day.date === date
    );

    if (availabilityIndex === -1) {
      doctor.availability.push({
        date,
        slots: [],
      });
      availabilityIndex = doctor.availability.length - 1;
    }

    const existingSlots = doctor.availability[availabilityIndex].slots;
    for (const slot of slots) {
      const startDate = new Date(
        `${setAvailabilityDto.date}T${slot.startTime}:00.000Z`
      );
      const endDate = new Date(
        `${setAvailabilityDto.date}T${slot.endTime}:00.000Z`
      );

      const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
      const numSlots = Math.ceil(duration / 15);

      for (let i = 0; i < numSlots; i++) {
        const slotStartTime = new Date(
          startDate.getTime() + i * 15 * 60 * 1000
        );
        const slotEndTime = new Date(slotStartTime.getTime() + 15 * 60 * 1000);
        console.log(slotStartTime, slotEndTime);

        const existingSlotIndex = existingSlots.findIndex(
          (s) => s.startTime.getTime() === slotStartTime.getTime()
        );

        if (existingSlotIndex === -1) {
          doctor.availability[availabilityIndex].slots.push({
            startTime: slotStartTime,
            endTime: slotEndTime,
            booked: false,
            patientId: null,
          });
        }
      }
    }

    return doctor.save();
  }

  // async setAvailability(
  //   id: string,
  //   setAvailabilityDto: SetAvailabilityDto
  // ): Promise<Doctor> {
  //   const doctor = await this.doctorModel.findById(id).exec();
  //   const date = setAvailabilityDto.date;
  //   const slots = setAvailabilityDto.slots;

  //   let availabilityIndex = doctor.availability.findIndex(
  //     (day) => day.date === date
  //   );

  //   if (availabilityIndex === -1) {
  //     doctor.availability.push({
  //       date,
  //       slots: [],
  //     });
  //     availabilityIndex = doctor.availability.length - 1;
  //   }

  //   const existingSlots = doctor.availability[availabilityIndex].slots;

  //   for (const slot of slots) {
  //     const startTime = new Date(slot.startTime);
  //     const endTime = new Date(slot.endTime);

  //     // console.log(startTime, endTime);
  //     const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  //     const numSlots = Math.ceil(duration / 15);

  //     for (let i = 0; i < numSlots; i++) {
  //       const slotStartTime = new Date(slot.startTime).getTime();
  //       const slotTime = new Date(slotStartTime + i * 15 * 60 * 1000);

  //       console.log(existingSlots);

  //       const existingSlotIndex = existingSlots.findIndex((s) => {
  //         // console.log(s.startTime.getTime(), "22222", slotTime);
  //         s.startTime === slotTime;
  //       });

  //       if (existingSlotIndex === -1) {
  //         doctor.availability[availabilityIndex].slots.push({
  //           startTime: slotTime,
  //           endTime: new Date(slotStartTime + (i + 1) * 15 * 60 * 1000),
  //           booked: false,
  //           patientId: null,
  //         });
  //       }
  //     }
  //   }

  //   return doctor.save();
  // }

  // async setAvailability(
  //   id: string,
  //   setAvailabilityDto: SetAvailabilityDto
  // ): Promise<Doctor> {
  //   const doctor = await this.doctorModel.findById(id).exec();
  //   const date = setAvailabilityDto.date;
  //   const slots = setAvailabilityDto.slots;
  //   console.log(date, doctor.availability, doctor);

  //   // const availabilityIndex = doctor.availability.findIndex((day, index) => {
  //   //   day.date === date;
  //   // });
  //   // if (availabilityIndex === -1) {

  //   // }

  //   // if (availabilityIndex === -1) {
  //   //   doctor.availability.push({
  //   //     date,
  //   //     slots: [],
  //   //   });
  //   // }

  //   //   const existingSlots = doctor.availability[availabilityIndex].slots;
  //   //   console.log("aaa", existingSlots);
  //     for (const slot of slots) {
  //       const startTime = new Date(`${slot.startTime}`);
  //       const endTime = new Date(`${slot.endTime}`);
  //       const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  //       const numSlots = Math.ceil(duration / 15);

  //       for (let i = 0; i < numSlots; i++) {
  //         const slotStartTime = new Date(`${date}${slot.startTime}`).getTime();
  //         const slotTime = new Date(
  //           slotStartTime + i * 15 * 60 * 1000
  //         ).toISOString();

  //         // const existingSlotIndex = existingSlots.findIndex(
  //         //   (s) => s.startTime === slotTime
  //         // );

  //         // if (existingSlotIndex === -1) {
  //           doctor.availability.push(slots.push({
  //             startTime: slotTime,
  //             endTime: new Date(
  //               slotStartTime + (i + 1) * 15 * 60 * 1000
  //             ).toISOString(),
  //             booked: false,
  //             patientId: null,
  //           }))
  //         // } else {
  //         //   throw new Error(`Slot ${slotTime} already exists.`);
  //         // }
  //       }
  //     }

  //     return doctor.save();
  // }
}
