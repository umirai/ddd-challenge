import { TaskProgressVO } from "src/domain/task-progress/task-progress-vo";

export interface ITaskProgressRepo {
  update(taskProgressVO: TaskProgressVO): Promise<TaskProgressVO>
  findByUserIdAndTaskId(userId: string, taskId: string): Promise<TaskProgressVO>
}
