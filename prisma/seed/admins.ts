export const createAdmins = async (prisma) => {
  const admins = [
    {
      id: '1',
      lastName: 'Matsubara',
      firstName: 'Shunya',
      email: 'm.shunya@gmail.com',
    },
  ];

  await prisma.admin.createMany({ data: admins });
};
