export const createUsers = async (prisma) => {
  const users = [
    {
      id: '1',
      lastName: 'Matsuno',
      firstName: 'Koji',
      email: 'm.koji@gmail.com',
      statusId: 1,
    },
    {
      id: '2',
      lastName: 'Kato',
      firstName: 'Shuhei',
      email: 's.kato@gmail.com',
      statusId: 1,
    },
    {
      id: '3',
      lastName: 'Harada',
      firstName: 'Takayuki',
      email: 'h.takayuki@gmail.com',
      statusId: 1,
    },
    {
      id: '4',
      lastName: 'Sakurai',
      firstName: 'Shunsuke',
      email: 's.shunsuke@gmail.com',
      statusId: 1,
    },
    {
      id: '5',
      lastName: 'Tomita',
      firstName: 'Kenji',
      email: 't.kenji@gmail.com',
      statusId: 1,
    },
    {
      id: '6',
      lastName: 'Umeda',
      firstName: 'Mirai',
      email: 'u.mirai@gmail.com',
      statusId: 1,
    },
    {
      id: '7',
      lastName: 'Takashiba',
      firstName: 'Minami',
      email: 't.minami@gmail.com',
      statusId: 1,
    },
    {
      id: '8',
      lastName: 'Song',
      firstName: 'Rio',
      email: 's.rio@gmail.com',
      statusId: 1,
    },
    {
      id: '9',
      lastName: 'Kondo',
      firstName: 'Shun',
      email: 'k.shun@gmail.com',
      statusId: 1,
    },
    {
      id: '10',
      lastName: 'Yamashita',
      firstName: 'Takahiro',
      email: 'y.takahiro@gmail.com',
      statusId: 1,
    },
    {
      id: '11',
      lastName: 'Karube',
      firstName: 'Yutaka',
      email: 'k.yutaka@gmail.com',
      statusId: 1,
    },
    {
      id: '12',
      lastName: 'Shiba',
      firstName: 'Ryohey',
      email: 's.ryohei@gmail.com',
      statusId: 1,
    },
    {
      id: '13',
      lastName: 'Tada',
      firstName: 'Yuya',
      email: 't.yuya@gmail.com',
      statusId: 1,
    },
  ]

  await prisma.user.createMany({ data: users })
}
