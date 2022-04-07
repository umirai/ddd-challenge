import { PrismaClient } from "@prisma/client"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { User } from "src/domain/user/user"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO, UserStatusProps } from "src/domain/user/user-status-vo"

export class UserRepo implements IUserRepo{
  private prisma: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        status: {
          select: { value: true }
        }
      }
    })
    return users.map((user) => {
      return new User({
        id: user.id,
        lastName: new UserNameVO(user.lastName),
        firstName: new UserNameVO(user.firstName),
        email: new UserEmailVO(user.email),
        status: new UserStatusVO(user.status.value as UserStatusProps)
      })
    })
  }
}
