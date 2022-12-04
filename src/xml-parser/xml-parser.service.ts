import { Injectable } from '@nestjs/common';
import * as parser from 'xml2json';
@Injectable()
export class XMLParserService {
  ToJSON<T>(xml: string): T {
    const parsed = JSON.parse(parser.toJson(xml) as unknown as any);
    return parsed;
  }
}
