export interface IDataModelFactory<DbModel, GetModel> {
  Build(dbItem: DbModel | DbModel[]): GetModel | GetModel[];
  BuildOne(dbItem: DbModel): GetModel;
  BuildMany(dbItem: DbModel[]): GetModel[];
}

export class ImplicitDataModelFactory<DbModel, GetModel>
  implements IDataModelFactory<any, any>
{
  private builder(model: DbModel): any {
    return {
      ...model,
    };
  }

  BuildOne(dbItem: DbModel): GetModel {
    return this.builder(dbItem);
  }

  BuildMany(dbItem: DbModel[]): GetModel[] {
    return dbItem.map(this.builder);
  }

  Build(dbItem: DbModel | DbModel[]): any | any[] {
    return Array.isArray(dbItem)
      ? dbItem.map(this.builder)
      : this.builder(dbItem);
  }
}
