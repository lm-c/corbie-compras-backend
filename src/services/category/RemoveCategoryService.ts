import prismaClient from '../../prisma';

interface CategoryRequest {
  id: number;
}

class RemoveCategoryService {
  async execute({ id }: CategoryRequest) {
    // if ((await prismaClient.task.count({ where: { id: id } })) > 0) {
    //   return null;
    // }

    const result = await prismaClient.category.delete({
      where: { id: id },
    });
    return result;
  }
}

export { RemoveCategoryService };
