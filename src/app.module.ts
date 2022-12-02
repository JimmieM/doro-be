import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APIConfigModule } from './config/config.module';
import { TrafficModule } from './traffic/traffic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`, // prod.env etc if needed. Check process.env.
    }),
    TrafficModule,
    APIConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
