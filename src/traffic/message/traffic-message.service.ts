import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ITrafficMessage } from '../../models/traffic-message.model';
import { TrafficXMLParserService } from '../traffic.xml-parser.service';
import { TrafficMessageAPI } from './traffic-message.api';
import { ITrafficMessageDto } from './traffic-message.dto';
import { TrafficMessageModelFactory } from './traffic-message.model-factory';

@Injectable()
export class TrafficMessageService {
  constructor(
    private readonly messagesApi: TrafficMessageAPI,
    private readonly xmlParser: TrafficXMLParserService,
    private readonly modelFactory: TrafficMessageModelFactory,
  ) {}

  async GetMessagesByAreaName(areaName: string): Promise<ITrafficMessage[]> {
    const xmlResponse = await this.messagesApi.GetMessagesByAreaName(areaName);
    if (!xmlResponse)
      throw new UnprocessableEntityException(
        'Failed to get traffic messages by area name',
      );

    const messages = this.xmlParser.ToJSON<{ message: ITrafficMessageDto[] }>(
      xmlResponse,
      'messages',
    );

    return this.modelFactory.BuildMany(messages.message);
  }
}
