import { Controller, Get, Post, Body } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserRepo } from 'src/infra/user/user-repo'
import { User } from 'src/domain/user/user'
import { UserDTO } from 'src/app/user/user-dto'
import { FindAllUsersUC } from 'src/app/user/find-all-users-uc'
import { CreateUserParams, CreateUserUC } from 'src/app/user/create-user-uc'

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

  @Post()
  async create(@Body() params: CreateUserParams): Promise<User> {
    const prisma = new PrismaClient()
    const userRepo = new UserRepo(prisma)
    const usecase = new CreateUserUC(userRepo)
    const result = await usecase.do(params)
    return result
  }
}
