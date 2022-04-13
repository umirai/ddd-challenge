import { User } from "src/domain/user/user"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO, UserStatusProps } from "src/domain/user/user-status-vo"
import { TeamRebuilder } from "src/domain/services/team-rebuilder"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { ITeamRepo } from "src/domain/team/team-repo-interface"

export type UpdateUserStatusParams = {
  userId: string,
  newUserStatus: UserStatusProps,
}

export class UpdateUserStatusUC {
  private readonly userRepo: IUserRepo
  private readonly teamRepo: ITeamRepo

  public constructor(
    userRepo: IUserRepo,
    teamRepo: ITeamRepo,
  ) {
    this.userRepo = userRepo
    this.teamRepo = teamRepo
  }

  public async do(params: UpdateUserStatusParams): Promise<User> {
    const { userId, newUserStatus } = params
    const user = await this.userRepo.findById(userId)
    const { id, lastName, firstName, email, status } = user.allProps

    if (status === newUserStatus) {
      return user
    }

    const newUserStatusVO = new UserStatusVO(newUserStatus)
    const newUser = new User({
      id: id,
      lastName: new UserNameVO(lastName),
      firstName: new UserNameVO(firstName),
      email: new UserEmailVO(email),
      status: newUserStatusVO
    })

    const teamRebuilder = new TeamRebuilder(userId, this.teamRepo)
    const newTeam = await teamRebuilder.updataUserStatus(newUserStatusVO)
    await this.teamRepo.updateAffiliation(newTeam)
    await this.userRepo.update(newUser)
    return newUser
  }
}
