import { PrismaClient } from "@prisma/client"
import { IUserRepo } from "src/domain/user/user-repo-interface"
import { User } from "src/domain/user/user"
import { UserNameVO } from "src/domain/user/user-name-vo"
import { UserEmailVO } from "src/domain/user/user-email-vo"
import { UserStatusVO, UserStatusProps, UserStatusId } from "src/domain/user/user-status-vo"

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

  public async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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

    if (user === null) throw new Error('参加者が見つかりませんでした。')

    return new User({
      id: user.id,
      lastName: new UserNameVO(user.lastName),
      firstName: new UserNameVO(user.firstName),
      email: new UserEmailVO(user.email),
      status: new UserStatusVO(user.status.value as UserStatusProps)
    })
  }

  public async findByEmail(userEmailVO: UserEmailVO): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmailVO.value },
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

    if (user === null) return null

    return new User({
      id: user.id,
      lastName: new UserNameVO(user.lastName),
      firstName: new UserNameVO(user.firstName),
      email: userEmailVO,
      status: new UserStatusVO(user.status.value as UserStatusProps)
    })
  }

  public async create(user: User): Promise<User> {
    const { id, lastName, firstName, email, status } = user.allProps
    await this.prisma.user.create({
      data: {
        id: id,
        lastName: lastName,
        firstName: firstName,
        email: email,
        statusId: UserStatusId[status]
      }
    })
    return user
  }

  public async update(user: User): Promise<User> {
    const { id, lastName, firstName, email, status } = user.allProps
    await this.prisma.user.update({
      where: { id: id },
      data: {
        lastName: lastName,
        firstName: firstName,
        email: email,
        statusId: UserStatusId[status]
      }
    })
    return user
  }
}
