import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from './config.model';

export const CONFIG_PROVIDER = 'CONFIG';

const configFactory = {
  provide: CONFIG_PROVIDER,
  useFactory: (config: ConfigService) => {
    return {
      sverigesRadioAPI: config.get('SR_API'),
    } as IConfig;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [configFactory],
  exports: [configFactory],
  imports: [ConfigModule],
})
export class APIConfigModule {}
