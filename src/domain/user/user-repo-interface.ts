import { User } from "src/domain/user/user"
import { UserEmailVO } from "src/domain/user/user-email-vo"

export interface IUserRepo {
  findAll(): Promise<User[]>
  findByEmail(userEmailVO: UserEmailVO): Promise<User | null>
  create(user: User): Promise<User>
  update(user: User): Promise<User>
}
