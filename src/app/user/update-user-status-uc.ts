import { User } from "src/domain/user/user"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO } from "src/domain/user/user-status-vo"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { UserStatusProps } from "src/domain/user/user-status-vo"

export type UpdateUserStatusParams = {
  id: string,
  status: UserStatusProps,
}

export class UpdateUserStatusUC {
  private readonly userRepo: IUserRepo

  public constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  public async do(params: UpdateUserStatusParams) {
    const user = await this.userRepo.findById(params.id)
    const { lastName, firstName, email } = user.allProps
    const newUser = new User({
      id: params.id,
      lastName: new UserNameVO(lastName),
      firstName: new UserNameVO(firstName),
      email: new UserEmailVO(email),
      status: new UserStatusVO(params.status)
    })
    return await this.userRepo.update(newUser)
  }
}
