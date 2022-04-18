import { PairDTO } from "src/app/team/pair-dto"

export class TeamDTO {
  public id: string
  public teamName: number
  public pairs: PairDTO[]

  public constructor(
    id: string,
    teamName: number,
    pairs: PairDTO[],
  ) {
    this.id = id
    this.teamName = teamName
    this.pairs = pairs
  }
}
