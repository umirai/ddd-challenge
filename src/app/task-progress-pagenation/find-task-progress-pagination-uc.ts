import { ITaskProgressPaginationQS, TaskProgressPaginationDTO } from "../query-service/task-progress-pagenation-qs-interface";

export type FindTaskProgressPaginationParams = {
  taskIdList: string[]
  taskStatusId: number
  pageNumber: number
}

export class FindTaskProgressPaginationUC {
  private taskProgressPaginationQS: ITaskProgressPaginationQS

  public constructor(taskProgressPaginationQS: ITaskProgressPaginationQS) {
    this.taskProgressPaginationQS = taskProgressPaginationQS
  }

  public async do(
    params: FindTaskProgressPaginationParams
  ): Promise<TaskProgressPaginationDTO[]> {
    return await this.taskProgressPaginationQS.search(params)
  }
}
