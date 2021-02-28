import { Repo } from "../adapters/repo";
import { Book } from "../entities/Book";

export function makeDeleteBook(repo: Repo<Book>) {
  return function deleteBook(id: string) {
    const book = repo.getById(id);
    if (!book) throw new Error(`Book with id ${id} is not found.`);
    repo.remove(id);
  };
}
