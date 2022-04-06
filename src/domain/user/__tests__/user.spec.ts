import { User, UserProps } from '../user'
import { UserEmailVO } from '../user-email-vo'
import { UserNameVO } from '../user-name-vo'
import { UserStatusVO } from '../user-status-vo'

describe('domain/user', () => {
  it('userエンティティを生成', () => {
    const userProps: UserProps = {
      id: 'testId',
      lastName: new UserNameVO('suzuki'),
      firstName: new UserNameVO('taro'),
      email: new UserEmailVO('s.taro@gmail.com'),
      status: new UserStatusVO('Active'),
    }

    const userEntity = new User(userProps)
    expect(userEntity).toBeInstanceOf(User)
  })

  it('user-name-voを生成', () => {
    const name = 'umeda'
    const userName = new UserNameVO(name)
    expect(userName).toBeInstanceOf(UserNameVO)
    expect(userName.value).toMatch(name)
  })

  it('user-email-voを生成', () => {
    const email = 'u.mirai@gmail.com'
    const UserEmail = new UserEmailVO(email)
    expect(UserEmail).toBeInstanceOf(UserEmailVO)
    expect(UserEmail.value).toMatch(email)
  })

  it('user-status-voを生成', () => {
    const status = 'Active'
    const UserStatus = new UserStatusVO(status)
    expect(UserStatus).toBeInstanceOf(UserStatusVO)
    expect(UserStatus.value).toMatch(status)
    expect(UserStatus.statusId).toBe(1)
  })
})
