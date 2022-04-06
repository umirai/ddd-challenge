import { PrismaClient } from '@prisma/client'
import { createAdmins } from './admins'
import { createUserStatus } from './user-status'
import { createUsers } from './users'
import { createAffiliations } from './affiliations'
import { createTaskCategories } from './task-categories'
import { createTasks } from './tasks'
import { createTaskStatus } from './task-status'
import { createUserTaskProgress } from './task-progress'

const prisma = new PrismaClient()

async function main() {
  await createAdmins(prisma)
  await createUserStatus(prisma)
  await createUsers(prisma)
  await createAffiliations(prisma)
  await createTaskCategories(prisma)
  await createTasks(prisma)
  await createTaskStatus(prisma)
  await createUserTaskProgress(prisma)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
