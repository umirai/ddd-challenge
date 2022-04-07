import { User } from "src/domain/user/user"

export interface IUserRepo {
  findAll(): Promise<User[]>
}
