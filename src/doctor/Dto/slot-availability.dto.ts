// set-availability.dto.ts

import { IsString } from "class-validator";

export class SetAvailabilityDto {
  @IsString()
  date: string;

  slots: [
    {
      startTime: string;
      endTime: string;
    }
  ];
}
