import { Book } from "../../src/entities/Book";
import { makeAddBook, NewBookOptions } from "../../src/use-cases/add-book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";

const sampleNewBookOptions = { bookName: "book 1", bookQuantity: 10 };

describe("Add Book Use case", () => {
  let repo: InMemoryRepo<Book>;
  let addBook: ({ bookName, bookQuantity, bookTags }: NewBookOptions) => Book;
  beforeEach(() => {
    repo = new InMemoryRepo<Book>();
    addBook = makeAddBook(repo);
  });

  it("adds a book", () => {
    const book = addBook(sampleNewBookOptions);
    expect(repo.getById(book.getId())).toBe(book);
  });

  test("two books can't have the same name", () => {
    addBook(sampleNewBookOptions);
    expect(() =>
      addBook({ bookName: sampleNewBookOptions.bookName, bookQuantity: 10 })
    ).toThrow();
  });
});
