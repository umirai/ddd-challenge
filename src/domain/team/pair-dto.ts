import { userInfo } from "os"

export class PairDTO {
  public id: string
  public pairName: string
  public userIdList: string[]

  public constructor(
    id: string,
    pairName: string,
    userIdList: string[]
  ) {
    this.id = id
    this.pairName = pairName
    this.userIdList = userIdList
  }
}
