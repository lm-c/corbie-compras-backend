import prismaClient from '../../prisma';

class ListUnitService {
  async execute() {
    const result = await prismaClient.unit.findMany({
      select: {
        id: true,
        abbreviation: true,
        name: true,
      },
      orderBy: { abbreviation: 'asc' },
    });

    return result;
  }
}

export { ListUnitService };
