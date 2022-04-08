import { Pair } from "../pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"

describe('pairエンティティ', () => {
  describe('pair.ts', () => {
    describe('正常系', () => {
      it('2名の参加者を持つペアエンティティを作成', () => {
        const userIdList = ['user1', 'user2']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        const pair = new Pair(props)
        expect(pair).toBeInstanceOf(Pair)
      })

      it('3名の参加者を持つペアエンティティを作成', () => {
        const userIdList = ['user1', 'user2', 'user3']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        const pair = new Pair(props)
        expect(pair).toBeInstanceOf(Pair)
      })

      it('userIdListゲッターで参加者のIDリストを取得', () => {
        const userIdList = ['user1', 'user2', 'user3']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        const pair = new Pair(props)
        expect(pair.userIdList).toBe(userIdList)
      })

      it('allPropsゲッターで全プロパティ値を取得', () => {
        const userIdList = ['user1', 'user2', 'user3']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        const pair = new Pair(props)
        expect(pair.allProps).toMatchObject({
          id: props.id,
          pairName: props.pairName.value,
          userIdList: props.userIdList
        })
      })
    })

    describe('異常系', () => {
      it('0名の参加者を持つペアエンティティを作成するとエラー', () => {
        const userIdList = []
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        expect(() => new Pair(props)).toThrowError()
      })

      it('1名の参加者を持つペアエンティティを作成するとエラー', () => {
        const userIdList = ['user1']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        expect(() => new Pair(props)).toThrowError()
      })

      it('4名の参加者を持つペアエンティティを作成するとエラー', () => {
        const userIdList = ['user1', 'user2', 'user3', 'user4']
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: userIdList
        }
        expect(() => new Pair(props)).toThrowError()
      })
    })
  })

  describe('pair-name-vo.ts', () => {
    describe('正常系', () => {
      it('ペア名「a」を作成', () => {
        const props = 'a'
        const pairNameVO = new PairNameVO(props)
        expect(pairNameVO).toBeInstanceOf(PairNameVO)
      })

      it('ペア名「z」を作成', () => {
        const props = 'z'
        const pairNameVO = new PairNameVO(props)
        expect(pairNameVO).toBeInstanceOf(PairNameVO)
      })

      it('valueゲッターで値を取得', () => {
        const props = 'a'
        const pairNameVO = new PairNameVO(props)
        expect(pairNameVO.value).toBe(props)
      })
    })

    describe('異常系', () => {
      it('ペア名「 」を作成するとエラー', () => {
        const props = ''
        expect(() => new PairNameVO(props)).toThrowError()
      })

      it('ペア名「abc」を作成するとエラー', () => {
        const props = 'abc'
        expect(() => new PairNameVO(props)).toThrowError()
      })

      it('ペア名「A」を作成するとエラー', () => {
        const props = 'A'
        expect(() => new PairNameVO(props)).toThrowError()
      })

      it('ペア名「123」を作成するとエラー', () => {
        const props = '123'
        expect(() => new PairNameVO(props)).toThrowError()
      })
    })
  })
})