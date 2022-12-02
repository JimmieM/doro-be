import { Test } from '@nestjs/testing';
import { TrafficXMLParserService } from '../traffic.xml-parser.service';
import { TrafficMessageAPI } from './traffic-message.api';
import { TrafficMessageModelFactory } from './traffic-message.model-factory';
import { TrafficMessageService } from './traffic-message.service';

describe('TrafficMessageService', () => {
  let trafficMessageService: TrafficMessageService;

  const mockedTrafficMessageAPI: TrafficMessageAPI = {
    config: { sverigesRadioAPI: '' },
    GetMessagesByAreaName: async (areaName: string): Promise<string> => {
      throw new Error('ups');
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(mockedTrafficMessageAPI, 'GetMessagesByAreaName')
      .mockImplementation(
        async (areaName: string) =>
          '<?xml version="1.0" encoding="utf-8"?><sr>  <copyright>Copyright Sveriges Radio 2022. All rights reserved.</copyright>  <pagination>    <page>1</page>    <size>7</size>    <totalhits>7</totalhits>    <totalpages>1</totalpages>  </pagination>  <messages>    <message id="8964269" priority="3">      <createddate>2022-11-22T17:31:46.543</createddate>      <title>E6 Landskrona–Malmö  </title>      <exactlocation>Tpl Lundåkra (24)–Borgeby (22) båda riktningarna </exactlocation>      <description>Risk för kö under rusningstrafik. Förlängning av påfart trafikplats Löddeköpinge (23). Avsmalnat och sänkt hastighet till 50km/h. </description>      <latitude>55.807033538818359</latitude>      <longitude>12.952509880065918</longitude>      <category>0</category>      <subcategory>Vägarbete</subcategory>    </message>    <message id="8967120" priority="3">      <createddate>2022-11-22T17:32:57.807</createddate>      <title>Sallerupsvägen Malmö</title>      <exactlocation>Västra Skrävlingevägen-Videdalsvägen i riktning mot Bara</exactlocation>      <description>Vägen avstängd pga asfalteringsarbete. Arbetet ska vara klart 16/12. </description>      <latitude>55.595369986823229</latitude>      <longitude>13.064188599766995</longitude>      <category>0</category>      <subcategory>Vägarbete</subcategory>    </message>    <message id="8969515" priority="3">      <createddate>2022-11-25T15:13:34.927</createddate>      <title>E4 Helsingborg</title>      <exactlocation>Tpl Kropp (30) mot Örkelljunga</exactlocation>      <description>Risk för kö pga ett körfält avstängt. Broarbete pågår.</description>      <latitude>56.087051391601563</latitude>      <longitude>12.780259132385254</longitude>      <category>0</category>      <subcategory>Vägarbete</subcategory>    </message>    <message id="8969517" priority="3">      <createddate>2022-11-25T15:13:27.65</createddate>      <title>E4 Helsingborg</title>      <exactlocation>Tpl Kropp (30) mot Helsingborg</exactlocation>      <description>Risk för kö pga ett körfält avstängt. Broarbete pågår.</description>      <latitude>56.087226867675781</latitude>      <longitude>12.781101226806641</longitude>      <category>0</category>      <subcategory>Vägarbete</subcategory>    </message>    <message id="8925995" priority="3">      <createddate>2022-10-11T16:47:43.713</createddate>      <title>Rv 13 Sjöbo–Ystad</title>      <exactlocation>Snogeholmsjön</exactlocation>      <description>Trafiken leds växelvis med trafikljus pga underhållsarbete.</description>      <latitude>55.552165985107422</latitude>      <longitude>13.747345924377441</longitude>      <category>0</category>      <subcategory>Vägarbete</subcategory>    </message>    <message id="8974820" priority="3">      <createddate>2022-12-02T18:24:16.357</createddate>      <title>Lv 113 Eslöv–Stockamöllan</title>      <exactlocation>Öslöv N–Orrahus i riktning mot Hasslebro </exactlocation>      <description>Trångt att passera pga lastbil som står illa till</description>      <latitude>55.921409606933594</latitude>      <longitude>13.371370315551758</longitude>      <category>0</category>      <subcategory>Trafikstörning</subcategory>    </message>    <message id="8947271" priority="3">      <createddate>2022-11-30T06:08:21.373</createddate>      <title>Ystad–Simrishamn</title>      <exactlocation />      <description>Tågtrafiken mellan Ystad och Simrishamn ersatt med buss enligt tillfällig tidtabell. Räkna med längre restid än normalt. Orsaken är banarbete. Fram till den 18/12 kl. 23:59.</description>      <latitude>55.427372002991056</latitude>      <longitude>13.825460699219333</longitude>      <category>1</category>      <subcategory>Tåg</subcategory>    </message>  </messages></sr>',
      );
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TrafficMessageService,
        { provide: TrafficMessageAPI, useValue: mockedTrafficMessageAPI },
        { provide: TrafficXMLParserService, useClass: TrafficXMLParserService },
        {
          provide: TrafficMessageModelFactory,
          useClass: TrafficMessageModelFactory,
        },
      ],
    }).compile();

    trafficMessageService = module.get(TrafficMessageService);
  });

  it('should be defined', () => {
    expect(trafficMessageService).toBeDefined();
  });

  it('returns expected messages', async () => {
    const response = await trafficMessageService.GetMessagesByAreaName(
      'Stockholm',
    );

    expect(response.length).toEqual(7);
  });
});
