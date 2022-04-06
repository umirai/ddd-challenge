export class UserEmailVO {
  private _value: string

  public constructor(value: string) {
    this._value = value
  }

  get value() {
    return this._value
  }
}
