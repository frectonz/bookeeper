export class Tag {
  name: string;

  constructor(options: TagOptions) {
    this.name = options.name;
  }
}

export interface TagOptions {
  name: string;
}
