import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { CreateSlotAvailabilityDto } from "./Dto/createSlotAvailability.dto";
import {
  SlotAvailability,
  SlotAvailabilityDocument,
} from "./Schemas/slot-availability.schema";

@Injectable()
export class SlotAvailabilityService {
  constructor(
    @InjectModel("SlotAvailability")
    private slotAvailabilityModel: Model<SlotAvailabilityDocument>
  ) {}

  async createSlot(createSlotDto: CreateSlotAvailabilityDto) {
    try {
      const result = await this.slotAvailabilityModel.create(createSlotDto);
      return result;
    } catch (err) {
      throw new HttpException((err as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSlot(): Promise<any> {
    const result = await this.slotAvailabilityModel.find();
    return result;
  }

  async findSlotById(id): Promise<any> {
    const doctor = this.slotAvailabilityModel.findOne({ _id: id });
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }
    return doctor;
  }
}
