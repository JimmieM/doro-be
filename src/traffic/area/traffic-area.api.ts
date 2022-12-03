import { Inject, Injectable } from '@nestjs/common';
import { IConfig } from '../../config/config.model';
import { CONFIG_PROVIDER } from '../../config/config.module';
import { axiosApiInstance, catchError } from '../../libs/axios.interceptor';

@Injectable()
export class TrafficAreaAPI {
  constructor(@Inject(CONFIG_PROVIDER) public readonly config: IConfig) {}

  GetAreaByLatLng(lat: number, lng: number) {
    return axiosApiInstance
      .get<string>(
        `${this.config.sverigesRadioAPI}/areas?latitude=${lat}&longitude=${lng}`,
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
