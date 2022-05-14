export class PairDTO {
  constructor(
    public id: string,
    public pairName: string,
    public userIdList: string[]
  ) {}
}
