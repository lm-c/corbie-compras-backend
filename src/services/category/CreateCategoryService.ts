import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
  family_id: string;
}
class CreateCategoryService {
  async execute({ name, family_id }: CategoryRequest) {
    if (name === '') throw new Error('Nome inválido!');

    const result = await prismaClient.category.create({
      data: {
        name: name,
        family_id: family_id,
      },
      select: { id: true, name: true },
    });

    return result;
  }
}

export { CreateCategoryService };
