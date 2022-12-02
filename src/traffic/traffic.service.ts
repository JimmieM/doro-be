import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ITrafficMessage } from '../models/traffic-message.model';
import { TrafficAreaService } from './area/traffic-area.service';
import { TrafficMessageService } from './message/traffic-message.service';

@Injectable()
export class TrafficService {
  constructor(
    private readonly messageService: TrafficMessageService,
    private readonly areaService: TrafficAreaService,
  ) {}

  async GetMessagesByLatLng(
    lat: number,
    lng: number,
  ): Promise<ITrafficMessage[]> {
    const area = await this.areaService.GetAreaByLatLng(lat, lng);
    if (!area) throw new UnprocessableEntityException('No area found.');

    const messages = await this.messageService.GetMessagesByAreaName(area.name);
    return messages;
  }
}
