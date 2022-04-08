import { TeamNameVO } from "src/domain/team/team-name-vo"
import { Pair } from "src/domain/team/pair"

export type TeamProps = {
  id: string,
  teamName: TeamNameVO,
  pairs: Pair[]
}

export class Team {
  private _props: TeamProps

  public constructor(props: TeamProps) {
    if (this.isInvalid(props.pairs)) throw new Error('チームには3名以上のメンバーが必要です。')
    this._props = props
  }

  get userIdList() {
    return this.getUserIdList(this._props.pairs)
  }

  get allProps() {
    const { id, teamName, pairs } = this._props
    return {
      id: id,
      teamName: teamName.value,
      pairs: pairs
    }
  }

  private isInvalid(pairs: Pair[]): boolean {
    return !(3 <= this.getUserIdList(pairs).length)
  }

  private getUserIdList(pairs) {
    let result: string[] = []
    pairs.map((pair) => {
      pair.userIdList.map((userId) => result.push(userId))
    })
    return result
  }
}
