import { TaskStatusVO, TaskStatusId } from "src/domain/task-progress/task-status-vo"

export type TaskProgressProps = {
  userId: string
  taskId: string
  status: TaskStatusVO
}

export class TaskProgressVO {
  private _props: TaskProgressProps

  public constructor(props: TaskProgressProps) {
    this._props = { ...props }
  }

  get status() {
    return this._props.status.value
  }

  get statusId() {
    return TaskStatusId[this._props.status.value]
  }

  get allProps() {
    const { userId, taskId, status } = this._props
    return {
      userId: userId,
      taskId: taskId,
      status: status.value,
    }
  }

  public isDone(): boolean {
    return this._props.status.value === 'Done'
  }
}
