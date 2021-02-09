import { Book } from "../entities/Book";
import { Repo } from "../adapters/repo";

export function makeGetBook(repo: Repo<Book>) {
  return function getBook(id: string) {
    return repo.getById(id);
  };
}
