export class UserDTO {
  public id: string
  public lastName: string
  public firstName: string
  public email: string
  public status: string

  public constructor(
    id: string,
    lastName: string,
    firstName: string,
    email: string,
    status: string,
  ) {
    this.id = id
    this.lastName = lastName
    this.firstName = firstName
    this.email = email
    this.status = status
  }
}
