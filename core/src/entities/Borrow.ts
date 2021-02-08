import { generateId } from "../helpers/generateId";
import { Book } from "./Book";
import { Borrower } from "./Borrower";

export class Borrow {
  private id: string;
  private borrower: Borrower;
  private returnDate: Date;
  private borrowDate: Date;
  private borrowedBook: Book;

  constructor(options: BorrowOptions) {
    this.id = `borrow-${generateId()}`;
    this.borrower = options.borrower;
    this.borrowedBook = options.borrowedBook;

    if (options.borrowDate) {
      if (options.returnDate.getTime() < options.borrowDate.getTime()) {
        this.returnDate = options.returnDate;
        this.borrowDate = options.borrowDate;
      } else {
        throw new Error("Return date must be always a head of borrow date.");
      }
    } else {
      this.borrowDate = new Date();
      this.returnDate = options.returnDate;
    }
  }

  getId() {
    return this.id;
  }

  getBorrower() {
    return this.borrower;
  }

  getBorrowedBook() {
    return this.borrowedBook;
  }

  getReturnDate() {
    return this.returnDate;
  }

  getBorrowDate() {
    return this.borrowDate;
  }

  timeTillReturnBook(): Date {
    return new Date(this.returnDate.getTime() - this.borrowDate.getTime());
  }
}

export interface BorrowOptions {
  returnDate: Date;
  borrowDate?: Date;
  borrowedBook: Book;
  borrower: Borrower;
}
