import { Controller, Get } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserRepo } from 'src/infra/user/user-repo'
import { UserDTO } from 'src/app/user/user-dto'
import { FindAllUsersUC } from 'src/app/user/find-all-users-uc'

@Controller({ path: '/users' })
export class UserController {
  @Get()
  async findAll(): Promise<UserDTO[]> {
    const prisma = new PrismaClient()
    const repo = new UserRepo(prisma)
    const usecase = new FindAllUsersUC(repo)
    const result = await usecase.do()
    return result
  }
}
