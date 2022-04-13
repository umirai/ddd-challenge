import { PrismaClient } from "@prisma/client"
import { UserRepo } from "src/infra/user/user-repo"
import { TeamRepo } from "src/infra/team/team-repo"
import { FindAllUsersUC } from "src/app/user/find-all-users-uc"
import { CreateUserUC } from "../user/create-user-uc"
import { UpdateUserStatusUC } from "../user/update-user-status-uc"
import { User } from "src/domain/user/user"
import { UserStatusProps } from "src/domain/user/user-status-vo"
import { UserDTO } from "src/domain/user/user-dto"

describe('app/user', () => {
  it('参加者一覧を取得する', async () => {
    const prisma = new PrismaClient()
    const userRepo = new UserRepo(prisma)
    const usecase = new FindAllUsersUC(userRepo)
    const result = await usecase.do()
    expect(result[0]).toBeInstanceOf(UserDTO)
  })

  it('参加者を新規作成する', async () => {
    const params = {
      lastName: 'kimura',
      firstName: 'takuya',
      email: 'k.takuya@gmail.com',
    }
    const prisma = new PrismaClient()
    const userRepo = new UserRepo(prisma)
    const usecase = new CreateUserUC(userRepo)
    const result = await usecase.do(params)
    expect(result).toBeInstanceOf(User)
  })

  describe('参加者の在籍ステータスを更新する', () => {
    const prisma = new PrismaClient()
    const userRepo = new UserRepo(prisma)
    const teamRepo = new TeamRepo(prisma)

    it('[離脱: 副作用なし]2P+3Pチームのうち、3Pから1名離脱', async () => {
      const params = {
        userId: '4',
        newUserStatus: 'Inactive' as UserStatusProps,
      }
      const usecase = new UpdateUserStatusUC(userRepo, teamRepo)
      const user = await usecase.do(params)
      expect(user.status).toBe(params.newUserStatus)
    })

    it('[加入: 副作用あり]3Pチームに1名加入', async () => {
      const params = {
        userId: '4',
        newUserStatus: 'Active' as UserStatusProps,
      }
      const usecase = new UpdateUserStatusUC(userRepo, teamRepo)
      const user = await usecase.do(params)
      const team = await teamRepo.findByUserId(params.userId)
      expect(user.status).toBe(params.newUserStatus)
      expect(team.pairs.length).toBe(2)
    })

    it('[離脱: リムーブパターン]2P+2Pチームから1名離脱', async () => {
      const params = {
        userId: '4',
        newUserStatus: 'Inactive' as UserStatusProps,
      }
      const usecase = new UpdateUserStatusUC(userRepo, teamRepo)
      const currentTeam = await teamRepo.findByUserId(params.userId)

      const user = await usecase.do(params)
      const updatedTeam = await teamRepo.findById(currentTeam.id)
      expect(user.status).toBe(params.newUserStatus)
      expect(updatedTeam.userIdList.length).toBe(3)
      expect(updatedTeam.pairs.length).toBe(1)
    })

    it('[離脱: スプリットパターン]2P+3Pチームのうち、2Pから1名離脱', async () => {
      const params = {
        userId: '9',
        newUserStatus: 'Inactive' as UserStatusProps,
      }
      const usecase = new UpdateUserStatusUC(userRepo, teamRepo)
      const currentTeam = await teamRepo.findByUserId(params.userId)
      const user = await usecase.do(params)
      const updatedTeam = await teamRepo.findById(currentTeam.id)
      expect(user.status).toBe(params.newUserStatus)
      expect(updatedTeam.userIdList.length).toBe(4)
      expect(updatedTeam.pairs.length).toBe(2)
    })
  })
})
