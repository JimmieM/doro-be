import { Injectable } from '@nestjs/common';
import { IDataModelFactory } from '../../model-factory/model-factory.model';
import { ITrafficArea } from '../../models/traffic-area.model';
import { ITrafficAreaDto } from './traffic-area.dto';

@Injectable()
export class TrafficAreaModelFactory
  implements IDataModelFactory<ITrafficAreaDto, ITrafficArea>
{
  private builder(model: ITrafficAreaDto): ITrafficArea {
    return {
      ...model,
      departmentUnitId: Number(model.trafficdepartmentunitid),
      fetchedAt: new Date(),
    };
  }

  BuildOne(dbItem: ITrafficAreaDto): ITrafficArea {
    return this.builder(dbItem);
  }

  BuildMany(dbItem: ITrafficAreaDto[]): ITrafficArea[] {
    return dbItem.map(this.builder);
  }

  Build(dbItem: ITrafficAreaDto | ITrafficAreaDto[]): any | any[] {
    return Array.isArray(dbItem)
      ? dbItem.map(this.builder)
      : this.builder(dbItem);
  }
}
