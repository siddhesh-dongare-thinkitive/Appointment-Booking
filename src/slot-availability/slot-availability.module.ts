import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  SlotAvailability,
  SlotAvailabilitySchema,
} from "./Schemas/slot-availability.schema";
import { SlotAvailabilityController } from "./slot-availability.controller";
import { SlotAvailabilityService } from "./slot-availability.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SlotAvailability.name, schema: SlotAvailabilitySchema },
    ]),
  ],
  providers: [SlotAvailabilityService],
  controllers: [SlotAvailabilityController],
})
export class SlotAvailabilityModule {}
