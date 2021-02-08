export class InMemoryRepo<T> {
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
}
