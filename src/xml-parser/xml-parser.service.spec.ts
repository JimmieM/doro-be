import { Test } from '@nestjs/testing';
import { XMLParserService } from './xml-parser.service';

describe('TrafficAreaService', () => {
  let service: XMLParserService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [XMLParserService],
    }).compile();

    service = module.get(XMLParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('XML correctly parses into JSON', async () => {
    const response = await service.ToJSON('<Parent><Child></Child></Parent>');

    const expected = { Parent: { Child: {} } };

    expect(response).toEqual(expected);
  });
});
