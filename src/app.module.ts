import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DoctorModule } from "./doctor/doctor.module";
import { PatientModule } from "./patient/patient.module";
import { SlotAvailabilityModule } from "./slot-availability/slot-availability.module";
import { SessionModule } from "./session/session.module";
import { AppointmentModule } from "./appointment/appointment.module";

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    MongooseModule.forRoot(
      "mongodb+srv://swapnillande:MongoDB$992233@cluster0.tukhjz3.mongodb.net/?retryWrites=true&w=majority"
    ),
    SlotAvailabilityModule,
    SessionModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
