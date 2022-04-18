import { UserEmailVO } from "src/domain/user/user-email-vo";
import { IUserRepo } from "src/domain/user/user-repo-interface";

export class UserService {
  private userRepo: IUserRepo

  public constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  public async duplicatedEmail(userEmailVO: UserEmailVO): Promise<boolean> {
    const user = await this.userRepo.findByEmail(userEmailVO)
    return user !== null
  }
}
