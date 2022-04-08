export class PairNameVO {
  private readonly _value: string

  public constructor(value: string) {
    if (this.isInvalid(value)) throw new Error('ペア名は1文字のアルファベットを指定してください。')
    this._value = value
  }

  get value() {
    return this._value
  }

  private isInvalid(value: string): boolean {
    const pattern = '^[a-z]{1}$';
    return !value.match(pattern)
  }
}
