import { Book, BookOptions } from "../../src/entities/Book";

const bookOptions: BookOptions = {
  name: "Book 1",
  quantity: 1,
  tags: ["Test Tag 1", "Test tag 2"],
};

describe("Book - Entity", () => {
  let book: Book;
  beforeEach(() => {
    book = new Book(bookOptions);
  });

  describe("Book Id", () => {
    it("has an id", () => {
      expect(book.getId()).toBeDefined();
    });

    it("generates new id for every book", () => {
      const ids: string[] = Array(40)
        .fill(0)
        .map((_, i) => new Book({ name: `Book-${i}`, quantity: 1 }))
        .map((book) => book.getId());

      ids.forEach((currentId) => {
        const idsThatAreEqualToCurrentId = ids.filter((id) => id == currentId)
          .length;
        expect(idsThatAreEqualToCurrentId).toBe(1);
      });
    });
  });

  it("has a name", () => {
    expect(book.getName()).toBe(bookOptions.name);
  });

  describe("Book Tag", () => {
    it("supports adding tags", () => {
      book.addTag("Tag");
      expect(book.hasTag("Tag")).toBeTruthy();
    });

    it("doesn't add a tag that already exists", () => {
      book.addTag("Tag");
      expect(() => book.addTag("Tag")).toThrow();
    });

    it("supports checking for tags", () => {
      book.addTag("Tag");
      expect(book.hasTag("Tag")).toBeTruthy();
    });

    it("supports removing tags", () => {
      book.addTag("Tag");
      book.removeTag("Tag");
      expect(book.hasTag("Tag")).toBeFalsy();
    });

    it("doesn't remove a tag that doesn't exist", () => {
      expect(() => book.removeTag("Tag")).toThrow();
    });
  });
});
