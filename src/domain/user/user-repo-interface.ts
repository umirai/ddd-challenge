import { User } from "src/domain/user/user"

export interface IUserRepo {
  getUsers(): Promise<User[]>
}
