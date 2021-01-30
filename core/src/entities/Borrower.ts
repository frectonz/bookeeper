import { Book } from "../entities/Book";
import { generateId } from "../helpers/generateId";

export class Borrower {
  private id: string;
  private name: string;
  private borrowerId: string;
  private borrowedBooks: Book[];

  constructor(options: BorrowerOptions) {
    this.id = `borrower-${generateId()}`;
    this.name = options.name;
    this.borrowerId = options.borrowerId;
    this.borrowedBooks = [];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getBorrowerId() {
    return this.borrowerId;
  }

  hasBorrowedBook(book: Book): boolean {
    return (
      this.borrowedBooks.filter(
        (currentBook) => currentBook.getId() === book.getId()
      ).length === 1
    );
  }

  borrowBook(book: Book) {
    if (this.hasBorrowedBook(book)) {
      throw new Error("Can't borrow book that is already borrowed.");
    }
    this.borrowedBooks.push(book);
  }

  returnBook(book: Book) {
    if (this.hasBorrowedBook(book))
      this.borrowedBooks = [
        ...this.borrowedBooks.filter(
          (currentBook) => currentBook.getId() !== book.getId()
        ),
      ];
    else throw new Error("Can't return a book that's not borrowed.");
  }
}

export interface BorrowerOptions {
  name: string;
  borrowerId: string;
}
