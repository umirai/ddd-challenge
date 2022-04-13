import { Pair } from "src/domain/team/pair"
import { PairNameVO } from "src/domain/team/pair-name-vo"

describe('pairエンティティ', () => {
  describe('pair.ts', () => {
    describe('正常系', () => {

      const twoUsersIdList = ['user1', 'user2']
      const threeUsersIdList = ['user1', 'user2', 'user3']
      const twoPairProps = {
        id: 'testId',
        pairName: new PairNameVO('a'),
        userIdList: twoUsersIdList
      }
      const threePairProps = {
        id: 'testId',
        pairName: new PairNameVO('a'),
        userIdList: threeUsersIdList
      }
      const twoPair = new Pair(twoPairProps)
      const threePair = new Pair(threePairProps)


      it('2名の参加者を持つペアエンティティを作成', () => {
        expect(twoPair).toBeInstanceOf(Pair)
      })

      it('3名の参加者を持つペアエンティティを作成', () => {
        expect(threePair).toBeInstanceOf(Pair)
      })

      it('get id()', () => {
        expect(twoPair.id).toBe(twoPairProps.id)
      })

      it('get pairName()', () => {
        expect(twoPair.pairName).toBe(twoPairProps.pairName.value)
      })

      it('get userIdList()]', () => {
        expect(twoPair.userIdList).toBe(twoUsersIdList)
      })

      it('get minMembersCount()', () => {
        expect(twoPair.minMembersCount).toBe(2)
      })

      it('get allProps()', () => {
        const props = twoPairProps
        expect(twoPair.allProps).toMatchObject({
          id: props.id,
          pairName: props.pairName.value,
          userIdList: props.userIdList
        })
      })

      it('hasMaxUsers()', () => {
        expect(twoPair.hasMaxUsers()).toBeFalsy()
        expect(threePair.hasMaxUsers()).toBeTruthy()
      })

      it('addUser()', () => {
        const addUserPair = new Pair({
          id: 'pairA',
          pairName: new PairNameVO('a'),
          userIdList: ['user1','user2']
        })
        addUserPair.addUser('user3')
        expect(addUserPair.userIdList).toMatchObject(['user1', 'user2', 'user3'])
        expect(() => threePair.addUser('user3')).toThrowError()
      })

      it('removeUser()', () => {
        const removeUserPair = new Pair({
          id: 'pairA',
          pairName: new PairNameVO('a'),
          userIdList: ['user1','user2', 'user3']
        })
        removeUserPair.removeUser('user3')
        expect(removeUserPair.userIdList).toMatchObject(['user1', 'user2'])
        expect(() => twoPair.removeUser('user2')).toThrowError()
      })

      it('getRandomUserId()', () => {
        expect(twoPairProps.userIdList.includes(twoPair.getRandomUserId())).toBeTruthy()
      })
    })

    describe('異常系', () => {
      it('0名の参加者を持つペアエンティティを作成するとエラー', () => {
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: []
        }
        expect(() => new Pair(props)).toThrowError()
      })

      it('1名の参加者を持つペアエンティティを作成するとエラー', () => {
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1']
        }
        expect(() => new Pair(props)).toThrowError()
      })

      it('4名の参加者を持つペアエンティティを作成するとエラー', () => {
        const props = {
          id: 'testId',
          pairName: new PairNameVO('a'),
          userIdList: ['user1', 'user2', 'user3', 'user4']
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

      it('get value()', () => {
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