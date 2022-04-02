export const createAffiliations = async (prisma) => {
  const teams = [
    { id: '1', teamName: 1 },
    { id: '2', teamName: 2 },
    { id: '3', teamName: 3 },
  ];

  const pairs = [
    { id: '1', pairName: 'a' },
    { id: '2', pairName: 'b' },
    { id: '3', pairName: 'a' },
    { id: '4', pairName: 'b' },
    { id: '5', pairName: 'a' },
  ];

  const affiliations = [
    { userId: '1', teamId: '1', pairId: '1' },
    { userId: '2', teamId: '1', pairId: '1' },
    { userId: '3', teamId: '1', pairId: '2' },
    { userId: '4', teamId: '1', pairId: '2' },
    { userId: '5', teamId: '1', pairId: '2' },
    { userId: '6', teamId: '2', pairId: '3' },
    { userId: '7', teamId: '2', pairId: '3' },
    { userId: '8', teamId: '2', pairId: '3' },
    { userId: '9', teamId: '2', pairId: '4' },
    { userId: '10', teamId: '2', pairId: '4' },
    { userId: '11', teamId: '3', pairId: '5' },
    { userId: '12', teamId: '3', pairId: '5' },
    { userId: '13', teamId: '3', pairId: '5' },
  ];

  const userBelongsTeamData = affiliations.map((aff) => {
    return { userId: aff.userId, teamId: aff.teamId };
  });

  const userBelongsPairData = affiliations.map((aff) => {
    return { userId: aff.userId, pairId: aff.pairId };
  });

  await prisma.team.createMany({ data: teams });
  await prisma.pair.createMany({ data: pairs });
  await prisma.userBelongsTeam.createMany({ data: userBelongsTeamData });
  await prisma.userBelongsPair.createMany({ data: userBelongsPairData });
};
