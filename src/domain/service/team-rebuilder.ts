import { Team } from "src/domain/team/team"
import { Pair } from "src/domain/team/pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"
import { ITeamRepo } from "src/domain/team/team-repo-interface"
import { UserStatusVO } from "src/domain/user/user-status-vo"
import { createRandomIdString } from "src/util/randomIdString"

export class TeamRebuilder {
  constructor(
    private userId: string,
    private teamRepo: ITeamRepo
  ) {}

  public async updataUserStatus(newUserStatusVO: UserStatusVO): Promise<Team> {
    // 1. 加入処理
    if (newUserStatusVO.isActive()) {
      const minTeam = await this.teamRepo.findMinimunTeam()
      const minPair = minTeam.getMinimumPair()
      const newTeam = this.addUser(minTeam, minPair, this.userId)
      return newTeam
    }

    // 2. 離脱処理
    const team = await this.teamRepo.findByUserId(this.userId)
    const newTeam = this.removeUser(team, this.userId)
    return newTeam
  }

  private addUser(
    team: Team,
    pair: Pair,
    userId: string
  ): Team {

    if (pair.canAcceptNewUser()) {
      pair.userIdList.push(userId)
      return team
    }

    // a. ペア内からランダムに1名取得して削除
    const randomUserId = pair.getRandomUserId()
    const randomUserIdIndex = pair.userIdList.indexOf(randomUserId)
    pair.userIdList.splice(randomUserIdIndex, 1)

    // b. 新規ペア作成
    const newPair = new Pair({
      id: createRandomIdString(),
      pairName: new PairNameVO(team.generateNonDuplicatePairName()),
      userIdList: [randomUserId, userId]
    })

    // c. チームにペアを追加
    team.pairs.push(newPair)

    // e. チームを返却
    return team
  }

  private removeUser(team: Team, userId: string): Team {
    const pair = team.getPairByUserId(userId)
    const index = pair.userIdList.indexOf(userId)
    pair.userIdList.splice(index, 1)

    // 1. チームの参加者が2名以下で管理者通知
    if (team.userIdList.length < team.minMembersCount) {
      return
    }

    // 2. ペアの参加者が1名以下で副作用
    if (pair.userIdList.length < pair.minMembersCount) {

      // a. 他にペアがなければ管理者通知
      if (team.noPairsAvailableToJoin()) {
        return
      }

      // b-1. あぶれたペア・参加者を特定
      const singleUserPair = team.pairs.find((pair) => pair.userIdList.length === 1)
      const singleUserPairIndex = team.pairs.indexOf(singleUserPair)
      const leftUserId = singleUserPair.userIdList[0]

      // b-2. ペアを削除
      team.pairs.splice(singleUserPairIndex, 1)

      // b-3. あぶれた参加者はチーム内の最小ペアに合流
      const minPair = team.getMinimumPair()
      this.addUser(team, minPair, leftUserId)
    }

    return team
  }
}
