import { IUserRepo } from "src/domain/user/user-repo-interface"
import { UserDTO } from "src/app/user/user-dto"

export class GetUsersUC {
  private readonly userRepo: IUserRepo

  public constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  public async do(): Promise<UserDTO[]> {
    try {
      const users = await this.userRepo.getUsers()
      return users.map((user) => {
        const { id, lastName, firstName, email, status } = user.allProps
        return new UserDTO(id, lastName, firstName, email, status)
      })
    } catch {
      throw new Error('参加者の取得に失敗しました。')
    }
  }
}
