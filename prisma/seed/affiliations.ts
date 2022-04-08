export const createAffiliations = async (prisma) => {
  const teams = [
    { id: '1', teamName: 1 },
    { id: '2', teamName: 2 },
    { id: '3', teamName: 3 },
  ]

  const pairs = [
    { id: '1', pairName: 'a' },
    { id: '2', pairName: 'b' },
    { id: '3', pairName: 'a' },
    { id: '4', pairName: 'b' },
    { id: '5', pairName: 'a' },
  ]

  const affiliations = [
    { teamId: '1', pairId: '1' },
    { teamId: '1', pairId: '2' },
    { teamId: '2', pairId: '3' },
    { teamId: '2', pairId: '4' },
    { teamId: '3', pairId: '5' },
  ]

  const userAffiliations = [
    { userId: '1', affiliationId: 1 },
    { userId: '2', affiliationId: 1 },
    { userId: '3', affiliationId: 2 },
    { userId: '4', affiliationId: 2 },
    { userId: '5', affiliationId: 2 },
    { userId: '6', affiliationId: 3 },
    { userId: '7', affiliationId: 3 },
    { userId: '8', affiliationId: 3 },
    { userId: '9', affiliationId: 4 },
    { userId: '10', affiliationId: 4 },
    { userId: '11', affiliationId: 5 },
    { userId: '12', affiliationId: 5 },
    { userId: '13', affiliationId: 5 },
  ]

  await prisma.team.createMany({ data: teams })
  await prisma.pair.createMany({ data: pairs })
  await prisma.affiliation.createMany({ data: affiliations })
  await prisma.userAffiliation.createMany({ data: userAffiliations })
}
