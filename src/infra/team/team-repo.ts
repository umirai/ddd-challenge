import { PrismaClient } from "@prisma/client"
import { TeamNameVO } from "src/domain/team/team-name-vo"
import { Pair } from "src/domain/team/pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"
import { Team } from "src/domain/team/team"
import { ITeamRepo } from "src/domain/team/team-repo-interface"

export class TeamRepo implements ITeamRepo {
  private readonly prisma: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async findById(teamId: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        Affiliation: {
          select: {
            pair: true,
            UserAffiliation: { select: { userId: true }}
          }
        }
      }
    })

    const pairs: Pair[] = team.Affiliation.map((aff) => {
      return new Pair({
        id: aff.pair.id,
        pairName: new PairNameVO(aff.pair.pairName),
        userIdList: aff.UserAffiliation.map((user) => user.userId),
      })
    })

    return new Team({
      id: team.id,
      teamName: new TeamNameVO(team.teamName),
      pairs: pairs
    })
  }

  public async findMinimunTeam(): Promise<Team> {
    const minTeamIdResult = await this.prisma.$queryRaw`
      SELECT
        COUNT(TMP.user_id) as user_count,
        TMP.team_id
      FROM
        (SELECT
          UA.user_id,
          A.team_id
        FROM
          user_affiliation as UA
          LEFT JOIN affiliations as A
            ON UA.affiliation_id = A.id) as TMP
      GROUP BY TMP.team_id
      ORDER BY user_count ASC
      LIMIT 1
    `
    const minTeamId: string = minTeamIdResult[0]['team_id']
    return await this.findById(minTeamId)
  }

  public async findByUserId(userId: string): Promise<Team> {
    const userTeamIdResult = await this.prisma.userAffiliation.findUnique({
      where: { userId: userId },
      include: {
        affiliation: { select: {
          teamId: true
        }}
      }
    })

    const userTeamId = userTeamIdResult.affiliation.teamId
    return await this.findById(userTeamId)
  }
}
