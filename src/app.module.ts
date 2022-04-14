import { Module } from '@nestjs/common'
import { UserController } from 'src/controller/user/user.controller'
import { TeamController } from 'src/controller/team/team.controller'
import { TaskProgressController } from 'src/controller/task-progress/task-progress.controller'

@Module({
  imports: [],
  controllers: [UserController, TeamController, TaskProgressController],
})
export class AppModule {}
