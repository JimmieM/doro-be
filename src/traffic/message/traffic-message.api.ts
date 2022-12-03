import { Inject, Injectable } from '@nestjs/common';
import { IConfig } from '../../config/config.model';
import { CONFIG_PROVIDER } from '../../config/config.module';
import { axiosApiInstance, catchError } from '../../libs/axios.interceptor';

@Injectable()
export class TrafficMessageAPI {
  constructor(@Inject(CONFIG_PROVIDER) public readonly config: IConfig) {}

  GetMessagesByAreaName(areaName: string) {
    return axiosApiInstance
      .get<string>(
        `${this.config.sverigesRadioAPI}/messages?trafficareaname=${areaName}`,
        {
          headers: {
            'Accept-Encoding': 'application/xml',
          },
        },
      )
      .then((resp) => {
        return resp.data;
      })
      .catch(catchError);
  }
}
