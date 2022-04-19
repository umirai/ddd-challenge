import { Prisma, PrismaClient } from "@prisma/client";
import { ITaskProgressPaginationQS, TaskProgressPaginationDTO } from "src/app/query-service/task-progress-pagenation-qs-interface";
import { FindTaskProgressPaginationParams } from "src/app/task-progress-pagenation/find-task-progress-pagination-uc";

export class TaskProgressPaginationQS implements ITaskProgressPaginationQS {
  private prisma: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async search(params: FindTaskProgressPaginationParams): Promise<TaskProgressPaginationDTO[]> {
    const { taskIdList, taskStatusId, pageNumber } = params

    const COUNT_PER_PAGE = 10
    const START_ROW = 1 + (COUNT_PER_PAGE * (pageNumber - 1))
    const response: [] = await this.prisma.$queryRaw`
      SELECT
        *
      FROM
        user_task_progress
      WHERE task_id IN (${Prisma.join(taskIdList)})
      AND task_status_Id = ${taskStatusId}
      ORDER BY task_id ASC
      LIMIT ${COUNT_PER_PAGE} OFFSET ${START_ROW}
    `

    return response.map((res) => {
      return new TaskProgressPaginationDTO(
        res['task_id'],
        res['task_status_id'],
        res['user_id']
      )
    })
  }
}
