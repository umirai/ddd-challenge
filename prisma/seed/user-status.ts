export const createUserStatus = async (prisma) => {
  const userStatus = [
    { value: 'Active' },
    { value: 'Inactive' },
    { value: 'Withdrawn' },
  ];

  await prisma.userStatus.createMany({ data: userStatus });
};
