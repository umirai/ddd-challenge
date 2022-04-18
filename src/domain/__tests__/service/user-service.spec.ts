import { PrismaClient } from "@prisma/client"
import { UserRepo } from "src/infra/user/user-repo"
import { UserService } from "src/domain/service/user-service"
import { UserEmailVO } from "src/domain/user/user-email-vo"

describe('user-service.ts', () => {
  const prisma = new PrismaClient()
  const userRepo = new UserRepo(prisma)
  const userService = new UserService(userRepo)

  it('重複しないメールアドレスを受け取ってfalseを返す', async () => {
    const userEmailVO = new UserEmailVO('no-dupulicated@email.com')
    expect(await userService.duplicatedEmail(userEmailVO)).toBeFalsy()
  })

  it('重複したメールアドレスを受け取ってtrueを返す', async () => {
    const userEmailVO = new UserEmailVO('u.mirai@gmail.com')
    expect(await userService.duplicatedEmail(userEmailVO)).toBeTruthy()
  })
})