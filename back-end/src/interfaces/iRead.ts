export interface IRead<T> {
  find(query): Promise<T[]>;
  findOne(id: string): Promise<T>;
}