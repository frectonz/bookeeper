import { InMemoryRepo } from "../../src/repos/InMemoryRepo";
import { Book } from "../../src/entities/Book";

describe("In Memeory Repository", () => {
  let repo: InMemoryRepo<Book>;
  let book: Book;
  beforeAll(() => {
    repo = new InMemoryRepo();
  });

  it("is able to insert", () => {
    book = new Book({ name: "Book 1", quantity: 10 });
    repo.insert(book.getId(), book);
    expect(repo.getById(book.getId())).toBe(book);
  });

  it("gets a book", () => {
    expect(repo.getById(book.getId())).toBe(book);
  });

  it("removes a book", () => {
    const bookToBeRemoved = new Book({
      name: "book 2",
      quantity: 200,
    });
    repo.insert(bookToBeRemoved.getId(), bookToBeRemoved);
    repo.remove(bookToBeRemoved.getId());
    expect(repo.getById(bookToBeRemoved.getId())).toBeUndefined();
  });
});
