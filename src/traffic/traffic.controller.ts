import {
  Controller,
  Get,
  ParseFloatPipe,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrafficService } from './traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get('/position')
  async GetByLatLng(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    try {
      const messages = await this.trafficService.GetMessagesByLatLng(lat, lng);
      return messages;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
