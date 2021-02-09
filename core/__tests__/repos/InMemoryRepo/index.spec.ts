import { InMemoryRepo } from "../../../src/repos/InMemoryRepo";
import { Book } from "../../../src/entities/Book";

const sampleBook = () => new Book({ name: "Book 1", quantity: 10 });

describe("In Memeory Repository", () => {
  let repo: InMemoryRepo<Book>;
  beforeEach(() => {
    repo = new InMemoryRepo();
  });

  it("is able to insert", () => {
    const book = sampleBook();
    repo.insert(book.getId(), book);
    expect(repo.getById(book.getId())).toBe(book);
  });

  it("gets a book", () => {
    const book = sampleBook();
    repo.insert(book.getId(), book);
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

  it("filters books to get a specific book", () => {
    const bookToBeSearched = new Book({
      name: "Book By Name",
      quantity: 10,
    });
    repo.insert(bookToBeSearched.getId(), bookToBeSearched);

    expect(
      repo.filter((book) => book.getName() === bookToBeSearched.getName())[0]
    ).toBe(bookToBeSearched);
  });
});
