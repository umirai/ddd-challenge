export const UserStatusId = {
  Active: 1,
  Inactive: 2,
  Withdrawn: 3,
} as const

export type UserStatusProps = keyof typeof UserStatusId

export class UserStatusVO {
  constructor(private _value: UserStatusProps) {}

  get value() {
    return this._value
  }

  get statusId() {
    return UserStatusId[this._value]
  }

  public isActive(): boolean {
    return this._value === 'Active'
  }
}
