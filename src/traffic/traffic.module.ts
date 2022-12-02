import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { TrafficAreaAPI } from './area/traffic-area.api';
import { TrafficMessageService } from './message/traffic-message.service';
import { TrafficMessageAPI } from './message/traffic-message.api';
import { TrafficAreaService } from './area/traffic-area.service';
import { XMLParserService } from '../xml-parser/xml-parser.service';
import { TrafficXMLParserService } from './traffic.xml-parser.service';
import { TrafficAreaModelFactory } from './area/traffic-area.model-factory';
import { TrafficMessageModelFactory } from './message/traffic-message.model-factory';

@Module({
  providers: [
    TrafficService,
    TrafficAreaAPI,
    TrafficMessageService,
    TrafficAreaService,
    TrafficMessageAPI,
    XMLParserService,
    TrafficXMLParserService,
    TrafficAreaModelFactory,
    TrafficMessageModelFactory,
  ],
  controllers: [TrafficController],
})
export class TrafficModule {}
