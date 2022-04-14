import { Module } from '@nestjs/common'
import { UserController } from 'src/controller/user/user.controller'
import { TeamController } from 'src/controller/team/team.controller'

@Module({
  imports: [],
  controllers: [UserController, TeamController],
})
export class AppModule {}
