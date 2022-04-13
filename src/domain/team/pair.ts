import { PairNameVO } from "src/domain/team/pair-name-vo"

export type PairProps = {
  id: string,
  pairName: PairNameVO,
  userIdList: string[]
}

export class Pair {
  private _props: PairProps
  private MIN_MEMBERS_COUNT = 2
  private MAX_MEMBERS_COUNT = 3

  public constructor(props: PairProps) {
    if (this.isInvalid(props.userIdList)) throw new Error('ペアには2-3名の参加者が必要です。')
    this._props = props
  }

  get id() {
    return this._props.id
  }

  get pairName() {
    return this._props.pairName.value
  }

  get userIdList() {
    return this._props.userIdList
  }

  get minMembersCount() {
    return this.MIN_MEMBERS_COUNT
  }

  get allProps() {
    const { id, pairName, userIdList } = this._props
    return {
      id: id,
      pairName: pairName.value,
      userIdList: userIdList
    }
  }

  private isInvalid(userIdList: string[]): boolean {
    const length = userIdList.length
    return !(length === this.MIN_MEMBERS_COUNT || length === this.MAX_MEMBERS_COUNT)
  }

  public canAcceptNewUser(): boolean {
    return this.userIdList.length === this.MIN_MEMBERS_COUNT
  }

  public getRandomUserId(): string {
    const userIdKey = Math.floor(Math.random() * this.userIdList.length)
    return this.userIdList[userIdKey]
  }
}
