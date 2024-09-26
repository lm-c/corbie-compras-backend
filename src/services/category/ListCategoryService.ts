import prismaClient from '../../prisma';

interface CategoryRequest {
  family_id: string;
}

class ListCategoryService {
  async execute({ family_id }: CategoryRequest) {
    const result = await prismaClient.category.findMany({
      where: { family_id: family_id },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    return result;
  }
}

export { ListCategoryService };
