export const TaskStatusId = {
  Default: 1,
  InProgress: 2,
  Done: 3,
} as const

export type TaskStatusProps = keyof typeof TaskStatusId

export class TaskStatusVO {
  constructor(private _value: TaskStatusProps) {}

  get value() {
    return this._value
  }

  get statusId() {
    return TaskStatusId[this._value]
  }
}
