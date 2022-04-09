import { Team } from "src/domain/team/team"

export interface ITeamRepo {
  findById(teamId: string): Promise<Team>
  findMinimunTeam(): Promise<Team>
  findByUserId(userId: string): Promise<Team>
}
