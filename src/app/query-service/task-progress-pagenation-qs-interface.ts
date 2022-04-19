import { FindTaskProgressPaginationParams } from "src/app/task-progress-pagenation/find-task-progress-pagination-uc";

export class TaskProgressPaginationDTO {
  public taskId: string
  public statusId: number
  public userId: string

  public constructor(
    taskId: string,
    statusId: number,
    userIdList: string
  ) {
    this.taskId = taskId
    this.statusId = statusId
    this.userId = userIdList
  }
}

export interface ITaskProgressPaginationQS {
  search(params: FindTaskProgressPaginationParams): Promise<TaskProgressPaginationDTO[]>
}
