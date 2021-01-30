import { generateId } from "../helpers/generateId";
import { Tag } from "./Tag";

export class Book {
  private id: string;
  private name: string;
  private tags: Tag[];
  private numberOfBorrowedBooks: number;
  private numberOfBooks: number;

  constructor(options: BookOptions) {
    this.id = generateId();
    this.name = options.name;
    this.numberOfBorrowedBooks = 0;
    this.numberOfBooks = options.quantity;
    this.tags = [];
    options.tags?.forEach((tagName) => this.addTag(tagName));
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
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
}

export interface BookOptions {
  name: string;
  tags?: string[];
  quantity: number;
}
