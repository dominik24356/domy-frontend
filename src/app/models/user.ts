export class User {
  username: string;
  email: string;
  password: string;
  boards?: any[];

  constructor(
    username: string,
    email: string,
    password: string,
    boards: any[] = []
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.boards = boards;
  }
}
