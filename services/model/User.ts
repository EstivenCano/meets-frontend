export class User {
  id: string;
  name: string;
  email: string;
  picture: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.picture = user.picture;
  }
}
