import prismaClient from '../../prisma';

interface SectorRequest {
  category_id: number;
}

class ListSectorService {
  async execute({ category_id }: SectorRequest) {
    if (category_id < 1) throw new Error('Categoria inválida!');
    const result = await prismaClient.sector.findMany({
      where: { category_id: category_id },
      select: {
        id: true,
        name: true,
        color: true,
        category: { select: { id: true, name: true } },
      },
      orderBy: { name: 'asc' },
    });

    return result;
  }
}

export { ListSectorService };
