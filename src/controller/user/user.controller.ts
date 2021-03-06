import { Controller, Get, Post, Put, Body } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserRepo } from 'src/infra/user/user-repo'
import { TeamRepo } from 'src/infra/team/team-repo'
import { User } from 'src/domain/user/user'
import { UserDTO } from 'src/app/user/user-dto'
import { FindAllUsersUC } from 'src/app/user/find-all-users-uc'
import { CreateUserParams, CreateUserUC } from 'src/app/user/create-user-uc'
import { UpdateUserStatusUC, UpdateUserStatusParams } from 'src/app/user/update-user-status-uc'

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

  @Put()
  async update(@Body() params: UpdateUserStatusParams): Promise<UserDTO> {
    const prisma = new PrismaClient()
    const userRepo = new UserRepo(prisma)
    const teamRepo = new TeamRepo(prisma)
    const usecase = new UpdateUserStatusUC(userRepo, teamRepo)
    const result = await usecase.do(params)
    return result
  }
}
