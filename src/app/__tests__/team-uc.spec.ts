import { PrismaClient } from '@prisma/client'
import { TeamRepo } from 'src/infra/team/team-repo'
import { FindAllTeamsUC } from 'src/app/team/find-all-teams-uc'
import { TeamDTO } from 'src/domain/team/team-dto'

describe('team-uc.ts', () => {
  it('チーム一覧を取得', async () => {
    const prisma = new PrismaClient()
    const repo = new TeamRepo(prisma)
    const usecase = new FindAllTeamsUC(repo)
    const result = await usecase.do()
    expect(result[0]).toBeInstanceOf(TeamDTO)
  })
})