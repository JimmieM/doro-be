import { Test, TestingModule } from '@nestjs/testing';
import { TrafficAreaService } from './area/traffic-area.service';
import { TrafficMessageService } from './message/traffic-message.service';
import { TrafficService } from './traffic.service';

describe('TrafficService', () => {
  let service: TrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficService,
        { provide: TrafficMessageService, useClass: TrafficMessageService },
        { provide: TrafficAreaService, useClass: TrafficAreaService },
      ],
    }).compile();

    service = module.get<TrafficService>(TrafficService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
