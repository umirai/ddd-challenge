import { PrismaClient } from "@prisma/client"
import { TaskProgressPaginationQS } from "src/infra/query-service/task-progress-pagination-qs"
import { FindTaskProgressPaginationUC } from "src/app/task-progress-pagenation/find-task-progress-pagination-uc"
import { TaskProgressPaginationDTO } from "src/app/query-service/task-progress-pagenation-qs-interface"

describe('app/task-progress-pagination', () => {
  it('特定課題、特定ステータスの一覧をページングで取得する', async () => {
    const params = {
      taskIdList: ['1', '2'],
      taskStatusId: 1,
      pageNumber: 1,
    }
    const prisma = new PrismaClient({ log: ["query"] })
    const taskProgressPaginatinQS = new TaskProgressPaginationQS(prisma)
    const usecase = new FindTaskProgressPaginationUC(taskProgressPaginatinQS)
    const result = await usecase.do(params)
    expect(result[0]).toBeInstanceOf(TaskProgressPaginationDTO)
  })
})
