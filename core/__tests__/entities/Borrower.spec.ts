import { Book } from "../../src/entities/Book";
import { Borrower, BorrowerOptions } from "../../src/entities/Borrower";

const borrowerOptions: BorrowerOptions = {
  name: "Borrower 1",
  borrowerId: "borrower-id",
};

describe("Borrower - Entity", () => {
  let borrower: Borrower;
  beforeEach(() => {
    borrower = new Borrower(borrowerOptions);
  });

  it("has a name.", () => {
    expect(borrower.getName()).toBeDefined();
  });

  it("has a borrower id.", () => {
    expect(borrower.getBorrowerId()).toBeDefined();
  });

  describe("Borrower Id", () => {
    it("has an id.", () => {
      expect(borrower.getId()).toBeDefined();
    });

    it("generates new id for every borrower.", () => {
      const ids: string[] = Array(40)
        .fill(0)
        .map(
          (_, i) =>
            new Borrower({ name: `Book-${i}`, borrowerId: "borrower-id" })
        )
        .map((borrower) => borrower.getId());

      ids.forEach((currentId) => {
        const idsThatAreEqualToCurrentId = ids.filter((id) => id == currentId)
          .length;
        expect(idsThatAreEqualToCurrentId).toBe(1);
      });
    });
  });

  describe("Borrow actions", () => {
    let book: Book;
    beforeEach(() => {
      book = new Book({
        name: "Book 1",
        quantity: 1,
      });

      borrower.borrowBook(book);
    });

    it("is able to borrow book", () => {
      const bookToBorrow = new Book({
        name: "Book to borrow",
        quantity: 1,
      });
      borrower.borrowBook(bookToBorrow);
      expect(borrower.hasBorrowedBook(bookToBorrow)).toBeTruthy();
    });

    it("throws error if already borrowed", () => {
      expect(() => borrower.borrowBook(book)).toThrow();
    });

    it("checks for the borrowed books", () => {
      expect(borrower.hasBorrowedBook(book)).toBeTruthy();
    });

    it("is able to return a borrowed book", () => {
      borrower.returnBook(book);
      expect(borrower.hasBorrowedBook(book)).toBeFalsy();
    });

    it("throws error if the book to be returned is not borrowed", () => {
      const notBorrowedBook = new Book({
        name: "not borrowed bood",
        quantity: 1,
      });

      expect(() => borrower.returnBook(notBorrowedBook)).toThrow();
    });
  });
});
