export const TaskStatusId = {
  Default: 1,
  InProgress: 2,
  Done: 3,
} as const

export type TaskStatusProps = keyof typeof TaskStatusId

export class TaskStatusVO {
  private _value: TaskStatusProps

  public constructor(value: TaskStatusProps) {
    this._value = value
  }

  get value() {
    return this._value
  }

  get statusId() {
    return TaskStatusId[this._value]
  }
}
