export class User {
  static idGenerator = 0;

  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id = User.idGenerator++
  ) {
  }

}
