import { Controller, Get } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserDTO } from 'src/app/user/user-dto'
import { UserRepo } from 'src/infra/user/user-repo'
import { GetUsersUC } from 'src/app/user/get-users-uc'

@Controller({ path: '/users' })
export class UserController {
  @Get()
  async getUsers(): Promise<UserDTO[]> {
    const prisma = new PrismaClient()
    const repo = new UserRepo(prisma)
    const usecase = new GetUsersUC(repo)
    const result = await usecase.do()
    return result
  }
}
