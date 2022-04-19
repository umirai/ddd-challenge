import { Controller, Get, Body } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TaskProgressPaginationQS } from "src/infra/query-service/task-progress-pagination-qs"
import { TaskProgressPaginationDTO } from "src/app/query-service/task-progress-pagenation-qs-interface"
import {
  FindTaskProgressPaginationParams,
  FindTaskProgressPaginationUC
} from 'src/app/task-progress-pagenation/find-task-progress-pagination-uc'

@Controller({ path: '/task-progress-pagination' })
export class TaskProgressPaginationController {
  @Get()
  async search(@Body() params: FindTaskProgressPaginationParams): Promise<TaskProgressPaginationDTO[]> {
    const prisma = new PrismaClient()
    const qs = new TaskProgressPaginationQS(prisma)
    const usecase = new FindTaskProgressPaginationUC(qs)
    const result = await usecase.do(params)
    return result
  }
}
