export class PairNameVO {
  constructor(private _value: string) {
    if (this.isInvalid(_value)) throw new Error('ペア名は1文字のアルファベットを指定してください。')
  }

  get value() {
    return this._value
  }

  private isInvalid(value: string): boolean {
    const pattern = '^[a-z]{1}$';
    return !value.match(pattern)
  }
}
