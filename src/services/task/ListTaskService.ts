import prismaClient from '../../prisma';

interface TaskRequest {
  category_id: number;
}

class ListTaskService {
  async execute({ category_id }: TaskRequest) {
    if (category_id < 1) throw new Error('Categoria inválida!');
    const result = await prismaClient.task.findMany({
      where: { sector: { category_id: category_id } },
      select: {
        id: true,
        description: true,
        qty: true,
        unit: { select: { id: true, abbreviation: true } },
        sector: {
          select: {
            id: true,
            name: true,
            color: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [{ sector_id: 'asc' }, { updated_at: 'desc' }],
    });

    return result;
  }
}

export { ListTaskService };
