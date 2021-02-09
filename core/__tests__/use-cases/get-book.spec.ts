import { Book } from "../../src/entities/Book";
import { makeGetBook } from "../../src/use-cases/get-book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";
import { makeAddBook, NewBookOptions } from "../../src/use-cases/add-book";

const sampleNewBookOptions = { bookName: "book 1", bookQuantity: 10 };

describe("Get Book Use case", () => {
  let repo: InMemoryRepo<Book>;
  let getBook: (id: string) => Book | undefined;
  let addBook: (options: NewBookOptions) => Book;
  beforeEach(() => {
    repo = new InMemoryRepo<Book>();
    getBook = makeGetBook(repo);
    addBook = makeAddBook(repo);
  });

  it("get a book.", () => {
    const book = addBook(sampleNewBookOptions);
    expect(getBook(book.getId())).toBe(book);
  });
});
