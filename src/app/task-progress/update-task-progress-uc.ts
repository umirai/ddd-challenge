import { TaskProgressVO } from "src/domain/task-progress/task-progress-vo"
import { ITaskProgressRepo } from "src/domain/task-progress/task-progress-repo-interface"
import { TaskStatusProps, TaskStatusVO } from "src/domain/task-progress/task-status-vo"

export type UpdateTaskProgressParams = {
  userId: string,
  taskId: string,
  status: TaskStatusProps
}

export class UpdateTaskProgressUC {
  constructor(private taskProgressRepo: ITaskProgressRepo) {}

  public async do(params: UpdateTaskProgressParams): Promise<TaskProgressVO> {
    const { userId, taskId, status } = params

    const taskProgress = new TaskProgressVO({
      userId: userId,
      taskId: taskId,
      status: new TaskStatusVO(status)
    })

    const currentTaskProgress = await this.taskProgressRepo.findByUserIdAndTaskId(userId, taskId)
    if (currentTaskProgress.isDone()) {
      throw new Error('一度完了した課題ステータスは変更できません。')
    }

    return await this.taskProgressRepo.update(taskProgress)
  }
}
