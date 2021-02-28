import { Repo } from "../adapters/repo";

export class InMemoryRepo<T> implements Repo<T> {
  private storage: Map<string, T>;

  constructor() {
    this.storage = new Map();
  }

  insert(id: string, obj: T) {
    this.storage.set(id, obj);
  }

  remove(id: string) {
    this.storage.delete(id);
  }

  getById(id: string) {
    return this.storage.get(id);
  }

  filter(filterFn: (obj: T) => boolean): T[] {
    let matchedObjs: T[] = [];
    this.storage.forEach((obj) => {
      filterFn(obj) ? matchedObjs.push(obj) : null;
    });
    return matchedObjs;
  }
}
