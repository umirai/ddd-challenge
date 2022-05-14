import { IUserRepo } from "src/domain/user/user-repo-interface"
import { UserDTO } from "src/app/user/user-dto"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  public async do(): Promise<UserDTO[]> {
    try {
      const users = await this.userRepo.findAll()
      return users.map((user) => {
        const { id, lastName, firstName, email, status } = user.allProps
        return new UserDTO(id, lastName, firstName, email, status)
      })
    } catch {
      throw new Error('参加者の取得に失敗しました。')
    }
  }
}
