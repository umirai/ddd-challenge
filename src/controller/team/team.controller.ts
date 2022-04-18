import { Controller, Get } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TeamRepo } from 'src/infra/team/team-repo'
import { FindAllTeamsUC } from 'src/app/team/find-all-teams-uc'
import { TeamDTO } from 'src/app/team/team-dto'

@Controller({ path: '/teams' })
export class TeamController {
  @Get()
  async findAll(): Promise<TeamDTO[]> {
    const prisma = new PrismaClient()
    const repo = new TeamRepo(prisma)
    const usecase = new FindAllTeamsUC(repo)
    const result = await usecase.do()
    return result
  }
}
