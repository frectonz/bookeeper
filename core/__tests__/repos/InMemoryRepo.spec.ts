import { Book } from "../../src/entities/Book";
import { InMemoryRepo } from "../../src/repos/InMemoryRepo";

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
    const book = sampleBook();
    repo.insert(book.getId(), book);
    repo.remove(book.getId());
    expect(repo.getById(book.getId())).toBeUndefined();
  });

  it("filters books to get a specific book", () => {
    const book = sampleBook();
    repo.insert(book.getId(), book);
    expect(repo.filter((b) => b.getName() === book.getName())[0]).toBe(book);
    expect(repo.filter((b) => b.getName() === "doesn't exist").length).toBe(0);
  });
});
