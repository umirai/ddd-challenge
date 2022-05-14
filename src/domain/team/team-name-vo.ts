export class TeamNameVO {
  constructor(private _value: number) {
    if (this.isInvalid(_value)) throw new Error('ペア名は3桁以下の数値を指定してください。')
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
