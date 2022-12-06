import { Injectable } from '@nestjs/common';
import { XMLParserService } from '../xml-parser/xml-parser.service';

interface SrObjectProps<T> {
  sr: T;
}

@Injectable()
export class TrafficXMLParserService extends XMLParserService {
  override ToJSON<T>(xml: string, node?: string): T {
    const parsed = super.ToJSON<T>(xml) as SrObjectProps<T>;
    if (node) return parsed.sr[node];

    return parsed.sr;
  }
}
