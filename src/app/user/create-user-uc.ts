import { User } from "src/domain/user/user"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { createRandomIdString } from "src/util/randomIdString"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO } from "src/domain/user/user-status-vo"
import { UserService } from "src/domain/service/user-service"

export type CreateUserParams = {
  lastName: string,
  firstName: string,
  email: string,
}

export class CreateUserUC {
  private readonly userRepo: IUserRepo

  public constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  public async do(params: CreateUserParams): Promise<User> {
    const { lastName, firstName, email } = params

    const userService = new UserService(this.userRepo)
    const userEmailVO = new UserEmailVO(email)
    if (await userService.duplicatedEmail(userEmailVO)) {
      throw new Error('登録済みのメールアドレスです。')
    }

    const user = new User({
      id: createRandomIdString(),
      lastName: new UserNameVO(lastName),
      firstName: new UserNameVO(firstName),
      email: new UserEmailVO(email),
      status: new UserStatusVO("Active")
    })

    return await this.userRepo.create(user)
  }
}
