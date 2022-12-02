import { Inject, Injectable } from '@nestjs/common';
import { IConfig } from '../../config/config.model';
import { CONFIG_PROVIDER } from '../../config/config.module';
import { axiosApiInstance, catchError } from '../../libs/axios.interceptor';

@Injectable()
export class TrafficAreaAPI {
  constructor(@Inject(CONFIG_PROVIDER) private readonly config: IConfig) {}

  GetAreaByLatLng(lat: number, lng: number) {
    return axiosApiInstance
      .get<any>(
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
