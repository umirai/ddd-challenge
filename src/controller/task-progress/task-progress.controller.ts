import { Controller, Put, Body } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TaskProgressVO } from 'src/domain/task-progress/task-progress-vo'
import { TaskProgressRepo } from 'src/infra/task-progress/task-progress-repo'
import { UpdateTaskProgressParams, UpdateTaskProgressUC } from 'src/app/task-progress/update-task-progress-uc'

@Controller({ path: '/task-progress' })
export class TaskProgressController {
  @Put()
  async update(@Body() params: UpdateTaskProgressParams): Promise<TaskProgressVO> {
    const prisma = new PrismaClient()
    const repo = new TaskProgressRepo(prisma)
    const usecase = new UpdateTaskProgressUC(repo)
    const result = await usecase.do(params)
    return result
  }
}
