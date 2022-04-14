export const createUserTaskProgress = async (prisma) => {
  type userTaskProgressType = {
    userId: string,
    taskId: string,
    taskStatusId: number
  }

  const userTaskProgress: userTaskProgressType[] = []

  const userIdList = [...Array(13).keys()].map(key => ++key)
  const taskIdList = [...Array(15).keys()].map(key => ++key)
  userIdList.map((userIdNumber) => {
    taskIdList.map((taskIdNumber) => {
      userTaskProgress.push({
        userId: String(userIdNumber),
        taskId: String(taskIdNumber),
        taskStatusId: 1
      })
    })
  })

  await prisma.userTaskProgress.createMany({ data: userTaskProgress })
}
