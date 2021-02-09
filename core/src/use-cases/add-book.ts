import { Repo } from "../adapters/repo";
import { Book } from "../entities/Book";

export function makeAddBook(repo: Repo<Book>) {
  return function addBook({
    bookName,
    bookQuantity,
    bookTags,
  }: NewBookOptions) {
    const aBookWithTheSameNameExists =
      repo.filter((book) => book.getName() === book.getName()).length > 0;

    if (aBookWithTheSameNameExists) {
      throw new Error("Two books can't have the same name.");
    }

    const book = new Book({
      name: bookName,
      quantity: bookQuantity,
      tags: bookTags,
    });
    repo.insert(book.getId(), book);
    return book;
  };
}

export interface NewBookOptions {
  bookName: string;
  bookQuantity: number;
  bookTags?: string[];
}
