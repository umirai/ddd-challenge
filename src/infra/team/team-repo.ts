import { PrismaClient } from "@prisma/client"
import { TeamNameVO } from "src/domain/team/team-name-vo"
import { Pair } from "src/domain/team/pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"
import { Team } from "src/domain/team/team"
import { ITeamRepo } from "src/domain/team/team-repo-interface"
import { join } from "@prisma/client/runtime"

type Affiliation = {
  id: number,
  teamId: string,
  pairId: string,
}

export class TeamRepo implements ITeamRepo {
  private readonly prisma: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async findById(teamId: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        Affiliation: {
          select: {
            pair: true,
            UserAffiliation: { select: { userId: true }}
          }
        }
      }
    })

    const pairs: Pair[] = team.Affiliation.map((aff) => {
      return new Pair({
        id: aff.pair.id,
        pairName: new PairNameVO(aff.pair.pairName),
        userIdList: aff.UserAffiliation.map((user) => user.userId),
      })
    })

    return new Team({
      id: team.id,
      teamName: new TeamNameVO(team.teamName),
      pairs: pairs
    })
  }

  public async findMinimunTeam(): Promise<Team> {
    const minTeamIdResult = await this.prisma.$queryRaw`
      SELECT
        COUNT(TMP.user_id) as user_count,
        TMP.team_id
      FROM
        (SELECT
          UA.user_id,
          A.team_id
        FROM
          user_affiliation as UA
          LEFT JOIN affiliations as A
            ON UA.affiliation_id = A.id) as TMP
      GROUP BY TMP.team_id
      ORDER BY user_count ASC
      LIMIT 1
    `
    const minTeamId: string = minTeamIdResult[0]['team_id']
    return await this.findById(minTeamId)
  }

  public async findByUserId(userId: string): Promise<Team> {
    const userTeamIdResult = await this.prisma.userAffiliation.findUnique({
      where: { userId: userId },
      include: {
        affiliation: { select: {
          teamId: true
        }}
      }
    })

    const userTeamId = userTeamIdResult.affiliation.teamId
    return await this.findById(userTeamId)
  }

  public async updateAffiliation(team: Team): Promise<Team> {

    const _team = await this.findById(team.id)
    const _length = _team.userIdList.length
    const length = team.userIdList.length

    const patternAddUser = _length < length
    const patternRemoveUser = length < _length

    // 1. 復学パターン（参加者が増える）
    if (patternAddUser) {
      const newUserId = team.userIdList.find((userId) => !_team.userIdList.includes(userId))
      const joinedPair = team.getPairByUserId(newUserId)

      if (_team.pairs.length === team.pairs.length) {
        const affiliation = await this.findAffiliatoinByPairId(joinedPair.id)
        await this.upsertUserAffiliation(newUserId, affiliation.id)
      } else {
        await this.prisma.pair.create({
          data: {
            id: joinedPair.id,
            pairName: team.generateNonDuplicatePairName(),
            Affiliation: {
              create: { teamId: team.id },
            },
          },
        })
        const transferUserId = joinedPair.userIdList.find((userId) => userId !== newUserId)
        const newAffiliation = await this.findAffiliatoinByPairId(joinedPair.id)
        await this.upsertUserAffiliation(transferUserId, newAffiliation.id)
        await this.upsertUserAffiliation(newUserId, newAffiliation.id)
      }
    }

    // 2. 休退学パターン（参加者が抜ける）
    if (patternRemoveUser) {

      // 離脱者
      const removedUserId = _team.userIdList.find((userId) => !team.userIdList.includes(userId))

      // 離脱者がもといたペア
      const pastPair = _team.getPairByUserId(removedUserId)

      // 離脱者の所属情報削除
      await this.prisma.userAffiliation.delete({
        where: { userId: removedUserId },
      })

      // [副作用]対象者が2名ペアから離脱して孤立者が出ているとき
      if (pastPair.userIdList.length === pastPair.minMembersCount) {

        const transferUserId = pastPair.userIdList.find((userId) => userId !== removedUserId)
        const newPairId = team.pairIdList.find((pairId) => !_team.pairIdList.includes(pairId))
        const patternRemovePair = team.pairs.length < _team.pairs.length
        const patternSplitePair = (team.pairs.length === _team.pairs.length) && !!newPairId

        // a. 2名ペアに合流 -> 孤立者の所属情報更新
        if (patternRemovePair) {
          const joinedPair = team.getPairByUserId(transferUserId)
          const affiliation = await this.findAffiliatoinByPairId(joinedPair.id)
          await this.upsertUserAffiliation(transferUserId, affiliation.id)
        }

        // b. 3名ペアに合流 -> 新ペア追加、孤立者と合流者の所属情報を更新
        if (patternSplitePair) {
          const newPair = team.pairs.find((pair) => pair.id === newPairId)
          const margedUserId = newPair.userIdList.find((userId) => userId !== transferUserId)
          await this.prisma.pair.create({
            data: {
              id: newPair.id,
              pairName: newPair.pairName,
              Affiliation: {
                create: {
                  teamId: team.id
                }
              }
            }
          })
          const affiliation = await this.findAffiliatoinByPairId(newPair.id)
          await this.upsertUserAffiliation(transferUserId, affiliation.id)
          await this.upsertUserAffiliation(margedUserId, affiliation.id)
        }

        // 元ペア削除
        await this.prisma.pair.delete({
          where: { id: pastPair.id },
        })
      }
    }

    return team
  }

  // public async _update(team: Team): Promise<Team> {

  //   const _team = await this.findById(team.id)
  //   const _length = _team.userIdList.length
  //   const length = team.userIdList.length
  //   const removePairId = _team.pairIdList.find((pairId) => !team.pairIdList.includes(pairId))
  //   const newPairId = team.pairIdList.find((pairId) => !_team.pairIdList.includes(pairId))

  //   const patternAddUser = _length < length
  //   const patternRemoveUser = length < length
  //   const patternRemovePair = team.pairs.length < _team.pairs.length
  //   const patternSplitePair = (!!removePairId) && (!!newPairId)

  //   // 1. 復学パターン（参加者が増える）
  //   if (patternAddUser) {
  //     const newUserId = team.userIdList.find((userId) => !_team.userIdList.includes(userId))
  //     const joinedPair = team.getPairByUserId(newUserId)

  //     if (_team.pairs.length === team.pairs.length) {
  //       const affiliation = await this.findAffiliatoinByPairId(joinedPair.id)
  //       await this.upsertUserAffiliation(newUserId, affiliation.id)
  //     } else {
  //       await this.prisma.pair.create({
  //         data: {
  //           id: joinedPair.id,
  //           pairName: team.generateNonDuplicatePairName(),
  //           Affiliation: {
  //             create: { teamId: team.id },
  //           },
  //         },
  //       })
  //       const transferUserId = joinedPair.userIdList.find((userId) => userId !== newUserId)
  //       const newAffiliation = await this.findAffiliatoinByPairId(joinedPair.id)
  //       await this.upsertUserAffiliation(transferUserId, newAffiliation.id)
  //       await this.upsertUserAffiliation(newUserId, newAffiliation.id)
  //     }
  //   }

  //   // 2. 休退学パターン（参加者が抜ける）
  //   // -> 対象者の所属情報削除
  //   // -> [副作用]参加者が孤立した場合：
  //   //    a. 2名ペアに合流：元ペアを削除し、孤立者の所属情報を更新
  //   //    b. 3名ペアに合流：元ペアを削除し、新ペアを追加し、孤立者と合流者の所属情報を更新
  //   if (patternRemoveUser) {

  //     // 参加者の所属情報を削除
  //     const removedUserId = _team.userIdList.find((userId) => !team.userIdList.includes(userId))
  //     await this.prisma.userAffiliation.delete({
  //       where: { userId: removedUserId },
  //     })

  //     // a.
  //     if (patternRemovePair) {
  //       const removedPair = _team.getPairByUserId(removedUserId)
  //       const transferUserId = removedPair.userIdList.find((userId) => userId !== removedUserId)
  //       const joinedPair = team.getPairByUserId(transferUserId)
  //       const affiliation = await this.findAffiliatoinByPairId(joinedPair.id)
  //       await this.upsertUserAffiliation(transferUserId, affiliation.id)
  //       await this.prisma.pair.delete({
  //         where: { id: removedPair.id },
  //       })
  //     }

  //     // b.
  //     if (patternSplitePair) {
  //       const removedPair = _team.getPairByUserId(removedUserId)
  //       const transferUserId = removedPair.userIdList.find((userId) => userId !== removedUserId)
  //       const joinedPair = team.getPairByUserId(transferUserId)
  //       await this.prisma.pair.create({
  //         data: {
  //           id: joinedPair.id,
  //           pairName: joinedPair.pairName,
  //           Affiliation: {
  //             create: {
  //               teamId: team.id
  //             }
  //           }
  //         }
  //       })
  //       const affiliation = await this.findAffiliatoinByPairId(joinedPair.id)
  //       await this.upsertUserAffiliation(transferUserId, affiliation.id)
  //       await this.upsertUserAffiliation(transferUserId, affiliation.id)
  //       await this.prisma.pair.delete({
  //         where: { id: removedPair.id },
  //       })
  //     }
  //   }

  //   return team
  // }

  private async findAffiliatoinByPairId(pairId: string): Promise<Affiliation> {
    return await this.prisma.affiliation.findUnique({
      where: { pairId: pairId }
    })
  }

  private async upsertUserAffiliation(userId: string, affiliationId: number): Promise<void> {
    await this.prisma.userAffiliation.upsert({
      where: { userId: userId },
      update: { affiliationId: affiliationId },
      create: {
        userId: userId,
        affiliationId: affiliationId
      },
    })
  }
}
