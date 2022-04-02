export const createTasks = async (prisma) => {
  const tasks = [
    {
      id: '1',
      taskCategoryId: 1,
      title: 'DBモデリング',
      description: '説明',
    },
    {
      id: '2',
      taskCategoryId: 1,
      title: 'データベース設計のアンチパターン',
      description: '説明',
    },
    {
      id: '3',
      taskCategoryId: 1,
      title: 'データベースにおけるNULLの扱い',
      description: '説明',
    },
    {
      id: '4',
      taskCategoryId: 2,
      title: 'SQL10本ノック',
      description: '説明',
    },
    {
      id: '5',
      taskCategoryId: 2,
      title: 'インデックス、複合インデックス、スロークエリ',
      description: '説明',
    },
    {
      id: '6',
      taskCategoryId: 2,
      title: 'ビュー',
      description: '説明',
    },
    {
      id: '7',
      taskCategoryId: 2,
      title: 'トランザクション',
      description: '説明',
    },
    {
      id: '8',
      taskCategoryId: 3,
      title: '単体テスト',
      description: '説明',
    },
    {
      id: '9',
      taskCategoryId: 3,
      title: 'フロントエンドテスト',
      description: '説明',
    },
    {
      id: '10',
      taskCategoryId: 3,
      title: 'E2Eテスト',
      description: '説明',
    },
    {
      id: '11',
      taskCategoryId: 3,
      title: 'TDDを実践しよう',
      description: '説明',
    },
    {
      id: '12',
      taskCategoryId: 4,
      title: 'SOLID原則',
      description: '説明',
    },
    {
      id: '13',
      taskCategoryId: 4,
      title: 'オニオンアーキテクチャ',
      description: '説明',
    },
    {
      id: '14',
      taskCategoryId: 4,
      title: 'DDD基礎',
      description: '説明',
    },
    {
      id: '15',
      taskCategoryId: 4,
      title: 'DDDを実践しよう',
      description: '説明',
    },
  ];

  await prisma.task.createMany({ data: tasks });
};
