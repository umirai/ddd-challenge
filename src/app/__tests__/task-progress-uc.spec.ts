import { PrismaClient } from "@prisma/client"
import { TaskProgressRepo } from "src/infra/task-progress/task-progress-repo"
import { UpdateTaskProgressUC } from "../task-progress/update-task-progress-uc"
import { TaskStatusProps } from "src/domain/task-progress/task-status-vo"

describe('task-progress-uc.ts', () => {

  const prisma = new PrismaClient()
  const taskProgressRepo = new TaskProgressRepo(prisma)
  const usecase = new UpdateTaskProgressUC(taskProgressRepo)

  it('ユーザーID, 課題IDを指定して進捗を取得する', async () => {
    const userId = '1'
    const taskId = '1'
    const taskProgressVO = await taskProgressRepo.findByUserIdAndTaskId(userId, taskId)
    expect(taskProgressVO.status).toBe('Default')
  })

  it('進捗ステータスを更新する', async () => {
    const params = {
      userId: '1',
      taskId: '1',
      status: 'Done' as TaskStatusProps
    }
    const result = await usecase.do(params)
    expect(result.status).toBe(params.status)
  })

  it('一度完了にした進捗ステータスを更新するとエラー', async () => {
    const params = {
      userId: '1',
      taskId: '1',
      status: 'InProgress' as TaskStatusProps
    }
    await expect(usecase.do(params)).rejects.toThrowError()
  })
})
