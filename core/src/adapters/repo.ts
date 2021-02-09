export interface Repo<T> {
  insert(id: string, obj: T): void;
  remove(id: string): void;
  getById(id: string): void;
  filter(filterFn: (obj: T) => boolean): T[];
}
