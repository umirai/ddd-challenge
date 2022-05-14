import { TeamNameVO } from "src/domain/team/team-name-vo"
import { Pair } from "src/domain/team/pair"

export type TeamProps = {
  id: string,
  teamName: TeamNameVO,
  pairs: Pair[]
}

export class Team {
  private MIN_MEMBERS_COUNT = 3

  constructor(private _props: TeamProps) {
    if (this.isInvalid(_props.pairs)) throw new Error('チームには3名以上のメンバーが必要です。')
  }

  get id() {
    return this._props.id
  }

  get teamName() {
    return this._props.teamName.value
  }

  get pairs() {
    return this._props.pairs
  }

  get pairIdList() {
    return this._props.pairs.map((pair) => pair.id)
  }

  get userIdList() {
    return this.getUserIdList(this._props.pairs)
  }

  get minMembersCount() {
    return this.MIN_MEMBERS_COUNT
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
    return !(this.MIN_MEMBERS_COUNT <= this.getUserIdList(pairs).length)
  }

  private getUserIdList(pairs: Pair[]): string[] {
    return [].concat(...pairs.map((pair) => pair.userIdList))
  }

  public getMinimumPair(): Pair {
    return this.pairs.reduce((minPair: Pair, currentPair: Pair): Pair => {
      if (minPair === null) minPair = currentPair
      if (minPair.userIdList.length > currentPair.userIdList.length) minPair = currentPair
      return minPair
    }, null)
  }

  public generateNonDuplicatePairName(): string {
    let nonDuplicatePairName = ''
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const pairNames = this.pairs.map((pair) => pair.pairName)
    for (let i = 0; i < alphabets.length; i++) {
      if (!pairNames.includes(alphabets[i])) {
        nonDuplicatePairName = alphabets[i]
        break
      }
    }
    return nonDuplicatePairName
  }

  public getPairByUserId(userId: string): Pair {
    return this.pairs.filter((pair) => pair.userIdList.includes(userId))[0]
  }

  public noPairsAvailableToJoin(): boolean {
    return this.pairs.length === 1
  }
}
