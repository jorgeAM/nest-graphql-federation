export class Post {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {}
}
