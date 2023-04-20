import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DoctorModule } from "./doctor/doctor.module";

@Module({
  imports: [
    DoctorModule,
    MongooseModule.forRoot(
      "mongodb+srv://siddheshdongare:sidd3844@cluster0.gtotejl.mongodb.net/?retryWrites=true&w=majority"
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
