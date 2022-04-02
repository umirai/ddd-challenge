export const createTaskCategories = async (prisma) => {
  const taskCategories = [
    { value: 'データベース設計' },
    { value: 'データベース' },
    { value: 'テスト' },
    { value: '設計' },
  ];

  await prisma.taskCategory.createMany({ data: taskCategories });
};
