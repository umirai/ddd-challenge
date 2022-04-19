import { Module } from '@nestjs/common'
import { UserController } from 'src/controller/user/user.controller'
import { TeamController } from 'src/controller/team/team.controller'
import { TaskProgressController } from 'src/controller/task-progress/task-progress.controller'
import { TaskProgressPaginationController } from './controller/task-progress-pagination/task-progress-pagination.controller'

@Module({
  imports: [],
  controllers: [
    UserController,
    TeamController,
    TaskProgressController,
    TaskProgressPaginationController,
  ],
})
export class AppModule {}
