export class UserDTO {
  public constructor(
    public id: string,
    public lastName: string,
    public firstName: string,
    public email: string,
    public status: string,
  ) {}
}
