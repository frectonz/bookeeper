export interface Repo<T> {
  insert(id: string, obj: T): void;
  remove(id: string): void;
  getById(id: string): T | undefined;
  filter(filterFn: (obj: T) => boolean): T[];
}
