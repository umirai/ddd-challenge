import { PrismaClient } from "@prisma/client"
import { ITaskProgressRepo } from "src/domain/task-progress/task-progress-repo-interface"
import { TaskProgressVO } from "src/domain/task-progress/task-progress-vo"
import { TaskStatusVO, TaskStatusProps } from "src/domain/task-progress/task-status-vo"

export class TaskProgressRepo implements ITaskProgressRepo {
  constructor(private prisma: PrismaClient) {}

  public async update(taskProgressVO: TaskProgressVO): Promise<TaskProgressVO> {
    const { userId, taskId } = taskProgressVO.allProps

    await this.prisma.userTaskProgress.update({
      where: { userId_taskId: { userId, taskId } },
      data: {
        taskStatusId: taskProgressVO.statusId
      }
    })

    return taskProgressVO
  }

  public async findByUserIdAndTaskId(userId: string, taskId: string): Promise<TaskProgressVO> {
    const taskProgress = await this.prisma.userTaskProgress.findUnique({
      where: {
        userId_taskId: {userId, taskId}
      },
      include: {
        taskStatus: {
          select: { value: true }
        }
      }
    })

    return new TaskProgressVO({
      userId: taskProgress.userId,
      taskId: taskProgress.taskId,
      status: new TaskStatusVO(taskProgress.taskStatus.value as TaskStatusProps)
    })
  }
}