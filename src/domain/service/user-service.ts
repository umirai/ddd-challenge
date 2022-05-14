import { UserEmailVO } from "src/domain/user/user-email-vo";
import { IUserRepo } from "src/domain/user/user-repo-interface";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  public async duplicatedEmail(userEmailVO: UserEmailVO): Promise<boolean> {
    const user = await this.userRepo.findByEmail(userEmailVO)
    return user !== null
  }
}
