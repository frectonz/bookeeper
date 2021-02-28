import { Book } from "../../src/entities/Book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";
import { makeDeleteBook } from "../../src/use-cases/delete-book";
import { makeAddBook, NewBookOptions } from "../../src/use-cases/add-book";
import { makeGetBook } from "../../src/use-cases/get-book";

const sampleNewBookOptions: NewBookOptions = {
  bookName: "book 1",
  bookQuantity: 10,
};

describe("Delete Book Use Case", () => {
  let repo: InMemoryRepo<Book>;
  let deleteBook: (id: string) => void;
  let addBook: (options: NewBookOptions) => Book;
  let getBook: (id: string) => Book | undefined;
  beforeEach(() => {
    repo = new InMemoryRepo<Book>();
    deleteBook = makeDeleteBook(repo);
    addBook = makeAddBook(repo);
    getBook = makeGetBook(repo);
  });

  it("deletes a book", () => {
    const book = addBook(sampleNewBookOptions);
    deleteBook(book.getId());
    expect(getBook(book.getId())).toBeUndefined();
  });

  it("throws if the book doesn't exist", () => {
    expect(() => deleteBook("non-existent-book-id")).toThrow();
  });
});
