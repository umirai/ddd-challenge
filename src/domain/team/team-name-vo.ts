export class TeamNameVO {
  private readonly _value: number

  public constructor(value: number) {
    if (this.isInvalid(value)) throw new Error('ペア名は3桁以下の数値を指定してください。')
    this._value = value
  }

  get value() {
    return this._value
  }

  private isInvalid(value: number): boolean {
    const textValue = String(value)
    const pattern = '^[0-9]{1,3}$'
    return !textValue.match(pattern)
  }
}
