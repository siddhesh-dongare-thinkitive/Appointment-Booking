import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSessionDto } from "./Dto/createSession.dto";
import { SessionDocument } from "./Schemas/session.schema";

@Injectable()
export class SessionService {
  constructor(
    @InjectModel("Session")
    private sessionModel: Model<SessionDocument>
  ) {}

  async createSession(createSessionDto: CreateSessionDto) {
    try {
      const result = await this.sessionModel.create(createSessionDto);
      return result;
    } catch (err) {
      throw new HttpException((err as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSessions(): Promise<any> {
    const result = await this.sessionModel.find().populate("slot");
    return result;
  }

  async findSessionById(id): Promise<any> {
    const result = this.sessionModel.findOne({ _id: id }).populate("slot");
    if (!result) {
      throw new NotFoundException("Doctor not found");
    }
    return result;
  }
}
