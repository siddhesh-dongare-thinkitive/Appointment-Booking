import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSessionDto } from "./Dto/createSession.dto";
import { SessionService } from "./session.service";

@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  async createDoctor(@Body() createSessionDto: CreateSessionDto) {
    return await this.sessionService.createSession(createSessionDto);
  }

  @Get()
  async GetAllSlots() {
    return await this.sessionService.getAllSessions();
  }

  @Get("/:id")
  async finsSlotById(@Param("id") id: string) {
    return await this.sessionService.findSessionById(id);
  }
}
