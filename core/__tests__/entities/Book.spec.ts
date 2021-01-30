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

  it("has a name", () => {
    expect(book.getName()).toBe(bookOptions.name);
  });

  describe("Book Quantity", () => {
    it("has a quantitty", () => {
      expect(book.getQuantity()).toBe(1);
    });

    it("is able to change quantity.", () => {
      book.changeQuantity(4);
      expect(book.getQuantity()).toBe(4);
    });
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

    it("throws when trying to remove a tag that doesn't exist", () => {
      expect(() => book.removeTag("Tag")).toThrow();
    });
  });

  describe("Book Borrow", () => {
    beforeEach(() => {
      book = new Book({
        name: "book-1",
        quantity: 2,
      });
    });

    const borrowAllBooks = () => {
      // call twice to borrow all books
      book.borrow();
      book.borrow();
    };

    it("is able to borrow book.", () => {
      book.borrow();
      expect(book.remainingBooks()).toBe(1);
    });

    it("checks if all books are borrowed.", () => {
      borrowAllBooks();
      expect(() => book.isAllBorrowed()).toBeTruthy();
    });

    it("can't borrow book if book is not available or is all borrowed.", () => {
      borrowAllBooks();
      expect(() => book.borrow()).toThrow();
    });

    it("is able to return a borrowed book.", () => {
      borrowAllBooks();
      book.returnBorrowedBook();
      book.returnBorrowedBook();
      expect(book.remainingBooks()).toBe(2);
    });

    it("throws an error if all the books are returned and you try to return a book.", () => {
      expect(() => book.returnBorrowedBook()).toThrow();
    });
  });
});
