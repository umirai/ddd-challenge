import { User } from "src/domain/user/user"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO, UserStatusProps } from "src/domain/user/user-status-vo"
import { TeamRebuilder } from "src/domain/service/team-rebuilder"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { ITeamRepo } from "src/domain/team/team-repo-interface"
import { UserDTO } from "src/app/user/user-dto"
import { last } from "rxjs"

export type UpdateUserStatusParams = {
  userId: string,
  newUserStatus: UserStatusProps,
}

export class UpdateUserStatusUC {
  constructor(
    private userRepo: IUserRepo,
    private teamRepo: ITeamRepo,
  ) {}

  public async do(params: UpdateUserStatusParams): Promise<UserDTO> {
    const { userId, newUserStatus } = params
    const user = await this.userRepo.findById(userId)
    const { id, lastName, firstName, email, status } = user.allProps

    if (status === newUserStatus) {
      return new UserDTO(id, lastName, firstName, email, status)
    }

    const newUserStatusVO = new UserStatusVO(newUserStatus)
    user.updateStatus(newUserStatusVO)

    const teamRebuilder = new TeamRebuilder(userId, this.teamRepo)
    const newTeam = await teamRebuilder.updataUserStatus(newUserStatusVO)
    await this.teamRepo.updateAffiliation(newTeam)
    await this.userRepo.update(user)
    return new UserDTO(id, lastName, firstName, email, newUserStatus)
  }
}
