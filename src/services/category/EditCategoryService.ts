import prismaClient from '../../prisma';

interface CategoryRequest {
  id: number;
  name: string;
}

class EditCategoryService {
  async execute({ id, name }: CategoryRequest) {
    const result = await prismaClient.category.update({
      where: { id: id },
      data: { name: name, updated_at: new Date() },
    });
    return result;
  }
}

export { EditCategoryService };
