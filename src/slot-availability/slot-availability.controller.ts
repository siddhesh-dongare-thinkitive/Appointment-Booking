import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSlotAvailabilityDto } from "./Dto/createSlotAvailability.dto";
import { SlotAvailabilityService } from "./slot-availability.service";

@Controller("slot-availability")
export class SlotAvailabilityController {
  constructor(private slotAvailability: SlotAvailabilityService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateSlotAvailabilityDto) {
    return await this.slotAvailability.createSlot(createDoctorDto);
  }

  @Get()
  async GetAllSlots() {
    return await this.slotAvailability.getAllSlot();
  }

  @Get("/:id")
  async finsSlotById(@Param("id") id: string) {
    return await this.slotAvailability.findSlotById(id);
  }
}
