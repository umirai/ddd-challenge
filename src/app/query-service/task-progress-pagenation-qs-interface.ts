import { FindTaskProgressPaginationParams } from "src/app/task-progress-pagenation/find-task-progress-pagination-uc";

export class TaskProgressPaginationDTO {
  constructor(
    public taskId: string,
    public statusId: number,
    public userIdList: string
  ) {}
}

export interface ITaskProgressPaginationQS {
  search(params: FindTaskProgressPaginationParams): Promise<TaskProgressPaginationDTO[]>
}
