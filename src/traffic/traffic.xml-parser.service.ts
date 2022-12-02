import { Injectable } from '@nestjs/common';
import { XMLParserService } from '../xml-parser/xml-parser.service';

@Injectable()
export class TrafficXMLParserService extends XMLParserService {
  override ToJSON<T>(xml: string, node?: string): T {
    const parsed = super.ToJSON(xml) as any;

    const selectedNode = parsed.sr[node];
    return selectedNode;
  }
}
