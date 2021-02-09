import { Book } from "../../src/entities/Book";
import { makeAddBook, NewBookOptions } from "../../src/use-cases/add-book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";

describe("Add Book Use case", () => {
  let repo: InMemoryRepo<Book>;
  let addBook: ({ bookName, bookQuantity, bookTags }: NewBookOptions) => Book;
  beforeEach(() => {
    repo = new InMemoryRepo<Book>();
    addBook = makeAddBook(repo);
  });

  it("adds a book", () => {
    const book = addBook({ bookName: "book 1", bookQuantity: 10 });
    expect(repo.getById(book.getId())).toBe(book);
  });
});
