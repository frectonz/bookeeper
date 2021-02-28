import { Book } from "../../src/entities/Book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";
import {
  makeUpdateBook,
  UpdateBookOptions,
} from "../../src/use-cases/update-book";
import { makeAddBook, NewBookOptions } from "../../src/use-cases/add-book";

const sampleNewBookOptions = { bookName: "book 1", bookQuantity: 10 };

describe("Update Book Use case", () => {
  let updateBook: (
    id: string,
    updateOptions?: UpdateBookOptions | undefined
  ) => Book;
  let repo: InMemoryRepo<Book>;
  let addBook: (options: NewBookOptions) => Book;
  beforeEach(() => {
    repo = new InMemoryRepo<Book>();
    addBook = makeAddBook(repo);
    updateBook = makeUpdateBook(repo);
  });

  it("updates a book", () => {
    const book = addBook(sampleNewBookOptions);
    const updatedBook = updateBook(book.getId(), {
      bookName: "Updated Name",
    });
    expect(book.getName()).not.toBe(updatedBook.getName());
  });

  it("throws if the book doesn't exist", () => {
    const updateNonExistentBook = () => updateBook("non-existing id");
    expect(updateNonExistentBook).toThrow();
  });

  it("doesn't update anything if there are no options", () => {
    const book = addBook(sampleNewBookOptions);
    const updatedBook = updateBook(book.getId());
    expect(book.getName()).toBe(updatedBook.getName());
    expect(book.getTags().length).toBe(updatedBook.getTags().length);
    expect(book.getQuantity()).toBe(updatedBook.getQuantity());
  });
});
