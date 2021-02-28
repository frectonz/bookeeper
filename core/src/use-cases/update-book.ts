import { Repo } from "../../src/adapters/repo";
import { Book } from "../../src/entities/Book";

export function makeUpdateBook(repo: Repo<Book>) {
  return function updateBook(
    id: string,
    updateOptions?: UpdateBookOptions
  ): Book {
    const book = repo.getById(id);

    if (!book) throw new Error(`Book with id ${id} is not found.`);

    const bookName = updateOptions?.bookName || book.getName();
    const bookQuantity = updateOptions?.bookQuantity || book.remainingBooks();
    const bookTags = updateOptions?.tags || book.getTags();

    repo.remove(book.getId());

    const updatedBook = new Book({
      name: bookName,
      quantity: bookQuantity,
      tags: bookTags,
    });

    repo.insert(updatedBook.getId(), updatedBook);
    return updatedBook;
  };
}

export interface UpdateBookOptions {
  tags?: string[];
  bookName?: string;
  bookQuantity?: number;
}
