import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ITrafficArea } from '../../models/traffic-area.model';
import { TrafficXMLParserService } from '../traffic.xml-parser.service';
import { TrafficAreaAPI } from './traffic-area.api';
import { ITrafficAreaDto } from './traffic-area.dto';
import { TrafficAreaModelFactory } from './traffic-area.model-factory';

@Injectable()
export class TrafficAreaService {
  constructor(
    private readonly areaApi: TrafficAreaAPI,
    private readonly xmlParser: TrafficXMLParserService,
    private readonly modelFactory: TrafficAreaModelFactory,
  ) {}

  async GetAreaByLatLng(lat: number, lng: number): Promise<ITrafficArea> {
    const xmlResponse = await this.areaApi.GetAreaByLatLng(lat, lng);
    if (!xmlResponse)
      throw new UnprocessableEntityException(
        'Failed to get traffic messages by area name',
      );

    const area = this.xmlParser.ToJSON<ITrafficAreaDto>(xmlResponse, 'area');

    return this.modelFactory.BuildOne(area);
  }
}
