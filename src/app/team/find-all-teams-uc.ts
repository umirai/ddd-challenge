import { PairDTO } from "src/app/team/pair-dto"
import { TeamDTO } from "src/app/team/team-dto"
import { ITeamRepo } from "src/domain/team/team-repo-interface"

export class FindAllTeamsUC {
  private readonly teamRepo: ITeamRepo

  public constructor(teamRepo: ITeamRepo) {
    this.teamRepo = teamRepo
  }

  public async do(): Promise<TeamDTO[]> {
    try {
      const teams = await this.teamRepo.findAll()
      return teams.map((team) => {
        return new TeamDTO(
          team.id,
          team.teamName,
          team.pairs.map((pair) => {
            return new PairDTO(
              pair.id,
              pair.pairName,
              pair.userIdList,
            )
          })
        )
      })
    } catch {
      throw new Error('チームの取得に失敗しました。')
    }
  }
}
