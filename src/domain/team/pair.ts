import { PairNameVO } from "src/domain/team/pair-name-vo"

export type PairProps = {
  id: string,
  pairName: PairNameVO,
  userIdList: string[]
}

export class Pair {
  private _props: PairProps

  public constructor(props: PairProps) {
    if (this.isInvalid(props.userIdList)) throw new Error('ペアには2-3名の参加者が必要です。')
    this._props = props
  }

  get userIdList() {
    return this._props.userIdList
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
    return !(length === 2 || length === 3)
  }
}
