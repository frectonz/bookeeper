import { Book } from "../../src/entities/Book";
import { Borrow } from "../../src/entities/Borrow";
import { Borrower } from "../../src/entities/Borrower";

describe("Borrow - Entity", () => {
  let borrow: Borrow;
  beforeEach(() => {
    borrow = new Borrow({
      returnDate: new Date("2030"),
      borrowedBook: new Book({ name: "book 1", quantity: 1 }),
      borrower: new Borrower({ name: "borrower", borrowerId: "borrower-id" }),
    });
  });

  it("has an id", () => {
    expect(borrow.getId()).toBeDefined();
  });

  it("has a borrower", () => {
    expect(borrow.getBorrower()).toBeDefined();
  });

  it("has a borrowed book", () => {
    expect(borrow.getBorrowedBook()).toBeDefined();
  });

  it("has a return date", () => {
    expect(borrow.getReturnDate()).toBeDefined();
  });

  it("has a borrow date", () => {
    expect(borrow.getBorrowDate()).toBeDefined();
  });

  describe("creates a new Borrow", () => {
    it("creates a borrow for borrow without a borrow date", () => {
      const borrow = () =>
        new Borrow({
          borrower: new Borrower({
            name: "borrower name",
            borrowerId: "borrowerId",
          }),
          borrowedBook: new Book({ name: "Book", quantity: 1 }),
          returnDate: new Date("20/10/2099"),
        });

      expect(borrow).not.toThrow();
    });

    it("creates a borrow for a borrow with a borrow date less than return date", () => {
      const borrow = () =>
        new Borrow({
          borrower: new Borrower({
            name: "borrower name",
            borrowerId: "borrowerId",
          }),
          borrowedBook: new Book({ name: "Book", quantity: 1 }),
          returnDate: new Date(),
          borrowDate: new Date(new Date().getTime() + 1000000),
        });

      expect(borrow).not.toThrow();
    });

    test("borrowDate must be less than returnDate", () => {
      const borrow = () =>
        new Borrow({
          borrower: new Borrower({
            name: "borrower name",
            borrowerId: "borrowerId",
          }),
          borrowedBook: new Book({ name: "Book", quantity: 1 }),
          returnDate: new Date("21/10/2099"),
          borrowDate: new Date("20/10/2099"),
        });

      expect(borrow).toThrow();
    });
  });

  it("shows time left untill return date is reached from borrow date", () => {
    expect(borrow.timeTillReturnBook().getTime()).toBe(
      borrow.getReturnDate().getTime() - borrow.getBorrowDate().getTime()
    );
  });
});
