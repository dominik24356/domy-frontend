export class User {
  userId?: number;
  username: string;
  email: string;
  password: string;
  boards?: any[];

  constructor(
    userId: number,
    username: string,
    email: string,
    password: string,
    boards: any[] = []
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.boards = boards;
  }
}
