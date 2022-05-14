import { PairDTO } from "src/app/team/pair-dto"

export class TeamDTO {
  constructor(
    public id: string,
    public teamName: number,
    public pairs: PairDTO[],
  ) {}
}
