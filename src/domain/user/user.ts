import { UserNameVO } from './user-name-vo'
import { UserEmailVO } from './user-email-vo'
import { UserStatusVO } from './user-status-vo'

export type UserProps = {
  id: string
  lastName: UserNameVO
  firstName: UserNameVO
  email: UserEmailVO
  status: UserStatusVO
}

export class User {
  private _props: UserProps

  public constructor(props: UserProps) {
    this._props = { ...props }
  }

  get status() {
    return this._props.status.value
  }

  get allProps() {
    const { id, lastName, firstName, email, status } = this._props
    return {
      id: id,
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      status: status.value,
    }
  }

  public updateStatus(newStatus: UserStatusVO) {
    this._props.status = newStatus
  }
}
