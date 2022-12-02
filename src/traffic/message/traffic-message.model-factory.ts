import { Injectable } from '@nestjs/common';
import { IDataModelFactory } from '../../model-factory/model-factory.model';
import { ITrafficMessage } from '../../models/traffic-message.model';
import { ITrafficMessageDto } from './traffic-message.dto';

@Injectable()
export class TrafficMessageModelFactory
  implements IDataModelFactory<ITrafficMessageDto, ITrafficMessage>
{
  private builder(model: ITrafficMessageDto): ITrafficMessage {
    const stringifyPriority = (priority: number) => {
      const priorites = {
        1: 'Låg',
        2: 'Medium',
        3: 'Hög',
      };

      return priorites[priority];
    };

    return {
      ...model,
      createdDate: new Date(model.createddate),
      exactLocation: model.exactlocation,
      priority: Number(model.priority),
      category: Number(model.category),
      latitude: Number(model.latitude),
      longitude: Number(model.longitude),
      subCategory: model.subcategory,
      fetchedAt: new Date(),
      priorityString: stringifyPriority(model.priority),
    };
  }

  BuildOne(dbItem: ITrafficMessageDto): ITrafficMessage {
    return this.builder(dbItem);
  }

  BuildMany(dbItem: ITrafficMessageDto[]): ITrafficMessage[] {
    return dbItem.map(this.builder);
  }

  Build(
    dbItem: ITrafficMessageDto | ITrafficMessageDto[],
  ): ITrafficMessage | ITrafficMessage[] {
    return Array.isArray(dbItem)
      ? dbItem.map(this.builder)
      : this.builder(dbItem);
  }
}
