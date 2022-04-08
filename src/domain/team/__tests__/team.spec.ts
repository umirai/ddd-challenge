import { Team } from "src/domain/team/team"
import { TeamNameVO } from "src/domain/team/team-name-vo"
import { Pair } from "src/domain/team/pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"

describe('teamエンティティ', () => {
  describe('team.ts', () => {
    describe('正常系', () => {
      it('3名の参加者を持つチームエンティティを作成', () => {
        const pair = new Pair({
          id: 'pairId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1', 'user2', 'user3'],
        })
        const props = {
          id: 'teamId',
          teamName: new TeamNameVO(1),
          pairs: [pair]
        }
        const team = new Team(props)
        expect(team).toBeInstanceOf(Team)
      })

      it('userIdListゲッターで参加者IDを一覧化して取得', () => {
        const pairA = new Pair({
          id: 'pairId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1', 'user2', 'user3'],
        })
        const pairB = new Pair({
          id: 'pairId',
          pairName: new PairNameVO('a'),
          userIdList: ['user3', 'user4', 'user5'],
        })
        const props = {
          id: 'teamId',
          teamName: new TeamNameVO(1),
          pairs: [pairA, pairB]
        }
        const team = new Team(props)
        const mergedUserIdList = pairA.userIdList.concat(pairB.userIdList)
        expect(team.userIdList).toMatchObject(mergedUserIdList)
      })

      it('allPropsゲッターで全プロパティ値を取得', () => {
        const pair = new Pair({
          id: 'pairId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1', 'user2', 'user3'],
        })
        const props = {
          id: 'teamId',
          teamName: new TeamNameVO(1),
          pairs: [pair]
        }
        const team = new Team(props)
        expect(team.allProps).toMatchObject({
          id: props.id,
          teamName: props.teamName.value,
          pairs: props.pairs
        })
      })
    })
    describe('異常系', () => {
      it('2名の参加者を持つチームエンティティを作成するとエラー', () => {
        const pair = new Pair({
          id: 'pairId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1', 'user2'],
        })
        const props = {
          id: 'teamId',
          teamName: new TeamNameVO(1),
          pairs: [pair]
        }
        expect(() => new Team(props)).toThrowError()
      })
    })
  })

  describe('team-name-vo.ts', () => {
    describe('正常系', () => {
      it('チーム名「0」を作成', () => {
        const props = 1
        const teamNameVO = new TeamNameVO(props)
        expect(teamNameVO).toBeInstanceOf(TeamNameVO)
        expect(teamNameVO.value).toBe(props)
      })

      it('チーム名「1」を作成', () => {
        const props = 1
        const teamNameVO = new TeamNameVO(props)
        expect(teamNameVO).toBeInstanceOf(TeamNameVO)
        expect(teamNameVO.value).toBe(props)
      })

      it('チーム名「10」を作成', () => {
        const props = 10
        const teamNameVO = new TeamNameVO(props)
        expect(teamNameVO).toBeInstanceOf(TeamNameVO)
        expect(teamNameVO.value).toBe(props)
      })

      it('チーム名「999」を作成', () => {
        const props = 999
        const teamNameVO = new TeamNameVO(props)
        expect(teamNameVO).toBeInstanceOf(TeamNameVO)
        expect(teamNameVO.value).toBe(props)
      })
    })
    describe('異常系', () => {
      it('チーム名「 」を作成するとエラー', () => {
        const props = null
        expect(() => new TeamNameVO(props)).toThrowError()
      })

      it('チーム名「1234」を作成するとエラー', () => {
        const props = 1234
        expect(() => new TeamNameVO(props)).toThrowError()
      })

      it('チーム名「0.5」を作成するとエラー', () => {
        const props = 0.5
        expect(() => new TeamNameVO(props)).toThrowError()
      })
    })
  })
})
