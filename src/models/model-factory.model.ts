export interface IDataModelFactory<DbModel, GetModel> {
  Build(dbItem: DbModel | DbModel[]): GetModel | GetModel[];
  BuildOne(dbItem: DbModel): GetModel;
  BuildMany(dbItem: DbModel[]): GetModel[];
}
