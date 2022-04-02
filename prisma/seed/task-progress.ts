export const createUserTaskProgress = async (prisma) => {
  const userTaskProgress = [
    { userId: '1', taskId: '1', taskStatusId: 3 },
    { userId: '1', taskId: '2', taskStatusId: 3 },
    { userId: '1', taskId: '3', taskStatusId: 3 },
  ];

  await prisma.userTaskProgress.createMany({ data: userTaskProgress });
};
