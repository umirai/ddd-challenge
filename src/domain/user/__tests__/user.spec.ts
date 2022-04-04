import { User, UserProps } from '../user';
import { UserEmailVO } from '../user-email-vo';
import { UserNameVO } from '../user-name-vo';
import { UserStatusVO } from '../user-status-vo';

describe('domain/user', () => {
  it('userエンティティを生成', () => {
    const userProps: UserProps = {
      id: 'testId',
      lastName: new UserNameVO('suzuki'),
      firstName: new UserNameVO('taro'),
      email: new UserEmailVO('s.taro@gmail.com'),
      status: new UserStatusVO('Active'),
    };

    const userEntity = new User(userProps);
    expect(userEntity).toBeInstanceOf(User);
  });
});
