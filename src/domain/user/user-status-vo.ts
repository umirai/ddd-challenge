const UserStatusId = {
  Active: 1,
  InActive: 2,
  Withdrawn: 3,
} as const

export type UserStatusProps = keyof typeof UserStatusId

export class UserStatusVO {
  private _value: UserStatusProps

  public constructor(value: UserStatusProps) {
    this._value = value
  }

  get value() {
    return this._value
  }

  get statusId() {
    return UserStatusId[this._value]
  }
}
