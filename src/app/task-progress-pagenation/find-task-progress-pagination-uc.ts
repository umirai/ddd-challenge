import { ITaskProgressPaginationQS, TaskProgressPaginationDTO } from "../query-service/task-progress-pagenation-qs-interface";

export type FindTaskProgressPaginationParams = {
  taskIdList: string[]
  taskStatusId: number
  pageNumber: number
}

export class FindTaskProgressPaginationUC {
  constructor(private taskProgressPaginationQS: ITaskProgressPaginationQS) {}

  public async do(
    params: FindTaskProgressPaginationParams
  ): Promise<TaskProgressPaginationDTO[]> {
    return await this.taskProgressPaginationQS.search(params)
  }
}
