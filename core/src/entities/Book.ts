import { generateId } from "../helpers/generateId";
import { Tag } from "./Tag";

export class Book {
  private id: string;
  private name: string;
  private tags: Tag[];
  private numberOfBorrowedBooks: number;
  private numberOfBooks: number;

  constructor(options: BookOptions) {
    this.tags = [];
    this.id = generateId();
    this.name = options.name;
    this.numberOfBorrowedBooks = 0;
    this.numberOfBooks = options.quantity;
    options.tags?.forEach((tagName) => this.addTag(tagName));
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getQuantity() {
    return this.numberOfBooks;
  }

  addTag(tagName: string): void {
    if (this.hasTag(tagName))
      throw new Error("Can't add a tag that already exists");
    else this.tags.push(new Tag({ name: tagName }));
  }

  hasTag(tagName: string): boolean {
    return !!this.tags.filter(
      (currentTag) => currentTag.name.toLowerCase() === tagName.toLowerCase()
    ).length;
  }

  removeTag(tagName: string): void {
    if (this.hasTag(tagName))
      this.tags = [
        ...this.tags.filter(
          (currentTag) =>
            currentTag.name.toLowerCase() !== tagName.toLowerCase()
        ),
      ];
    else throw new Error("Can't remove a tag that doen't exist");
  }

  isAllBorrowed(): boolean {
    return this.numberOfBorrowedBooks === this.numberOfBooks;
  }

  borrow(): void {
    if (this.isAllBorrowed())
      throw new Error("Can't borrow a book that already borrowed.");
    else this.numberOfBorrowedBooks++;
  }

  remainingBooks(): number {
    return this.numberOfBooks - this.numberOfBorrowedBooks;
  }

  returnBorrowedBook() {
    if (this.remainingBooks() === this.numberOfBooks) {
      throw new Error("Can't return book. There are no borrowed book.");
    } else {
      this.numberOfBorrowedBooks--;
    }
  }

  changeQuantity(quantity: number) {
    this.numberOfBooks = quantity;
  }
}

export interface BookOptions {
  name: string;
  tags?: string[];
  quantity: number;
}
