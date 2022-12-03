import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ITrafficMessage } from '../../models/traffic-message.model';
import { filterUnique } from '../../util/array.util';
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

  /**
   * SR's API can return duplicates where the content but ID is the same.
   * Here we're only interested if the description has been changed in a new post.
   * Not sure if this is intentional from them or not.
   */
  FilterDuplicateMessages(messages: ITrafficMessage[]): ITrafficMessage[] {
    return filterUnique<ITrafficMessage>(messages, 'description');
  }

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

    const models = this.modelFactory.BuildMany(messages.message);

    return this.FilterDuplicateMessages(models);
  }
}
