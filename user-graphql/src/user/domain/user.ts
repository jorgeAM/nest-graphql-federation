export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {}
}
