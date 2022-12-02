import { Module } from '@nestjs/common';
import { TrafficAreaAPI } from './area/traffic-area.api';
import { TrafficAreaModelFactory } from './area/traffic-area.model-factory';
import { TrafficAreaService } from './area/traffic-area.service';
import { TrafficMessageAPI } from './message/traffic-message.api';
import { TrafficMessageModelFactory } from './message/traffic-message.model-factory';
import { TrafficMessageService } from './message/traffic-message.service';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { TrafficXMLParserService } from './traffic.xml-parser.service';

@Module({
  providers: [
    TrafficService,
    TrafficAreaAPI,
    TrafficMessageService,
    TrafficAreaService,
    TrafficMessageAPI,
    TrafficXMLParserService,
    TrafficAreaModelFactory,
    TrafficMessageModelFactory,
  ],
  controllers: [TrafficController],
})
export class TrafficModule {}
