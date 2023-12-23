export class User {
  userId?: number;
  username: string;
  login: string;
  password: string;
  boards?: any[];

  constructor(
    userId: number,
    username: string,
    login: string,
    password: string,
    boards: any[] = []
  ) {
    this.userId = userId;
    this.username = username;
    this.login = login;
    this.password = password;
    this.boards = boards;
  }
}
