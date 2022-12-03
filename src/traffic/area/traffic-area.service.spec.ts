import { Test } from '@nestjs/testing';
import { TrafficXMLParserService } from '../traffic.xml-parser.service';
import { TrafficAreaAPI } from './traffic-area.api';
import { TrafficAreaModelFactory } from './traffic-area.model-factory';
import { TrafficAreaService } from './traffic-area.service';

describe('TrafficAreaService', () => {
  let trafficAreaService: TrafficAreaService;

  const mockedTrafficAreaAPI: TrafficAreaAPI = {
    config: { sverigesRadioAPI: '' },
    GetAreaByLatLng: async (_lat: number, _lng: number): Promise<string> => {
      throw new Error('ups');
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(mockedTrafficAreaAPI, 'GetAreaByLatLng')
      .mockImplementation(
        async (_lat: number, _lng: number) =>
          '<?xml version="1.0" encoding="utf-8"?>\r\n<sr>\r\n  <copyright>Copyright Sveriges Radio 2022. All rights reserved.</copyright>\r\n  <area name="Malmöhus" zoom="11" radius="80" trafficdepartmentunitid="2855" />\r\n</sr>',
      );
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TrafficAreaService,
        { provide: TrafficAreaAPI, useValue: mockedTrafficAreaAPI },
        { provide: TrafficXMLParserService, useClass: TrafficXMLParserService },
        { provide: TrafficAreaModelFactory, useClass: TrafficAreaModelFactory },
      ],
    }).compile();

    trafficAreaService = module.get(TrafficAreaService);
  });

  it('should be defined', () => {
    expect(trafficAreaService).toBeDefined();
  });

  it('returns expected department unit ID', async () => {
    const response = await trafficAreaService.GetAreaByLatLng(200, 200);

    const expected = {
      departmentUnitId: 2855,
      fetchedAt: '2022-12-02T19:31:49.900Z',
      name: 'Malmöhus',
      radius: '80',
      zoom: '11',
    };

    expect(response.departmentUnitId).toEqual(expected.departmentUnitId);
  });
});
