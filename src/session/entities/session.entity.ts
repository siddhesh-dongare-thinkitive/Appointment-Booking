import { IsDate, IsNotEmpty } from "class-validator";
import { SlotAvailability } from "src/slot-availability/Schemas/slot-availability.schema";

export class Session {
  @IsNotEmpty()
  @IsDate()
  startTime: string;

  @IsNotEmpty()
  @IsDate()
  endTime: string;

  @IsNotEmpty()
  slot: SlotAvailability;
}
