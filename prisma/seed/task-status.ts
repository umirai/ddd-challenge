export const createTaskStatus = async (prisma) => {
  const taskStatus = [
    { value: 'Default' },
    { value: 'InProgress' },
    { value: 'Done' },
  ]

  await prisma.taskStatus.createMany({ data: taskStatus })
}
