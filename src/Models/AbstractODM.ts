import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema<T>;
  protected modelName: string;

  constructor(
    schema: Schema,
    modelName: string,
  ) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async update(id: string, newData: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }
}

export default AbstractODM;