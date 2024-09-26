import prismaClient from '../../prisma';

interface SectorRequest {
  name: string;
  category_id: number;
  color: string;
}
class CreateSectorService {
  async execute({ name, category_id, color }: SectorRequest) {
    if (name === '') throw new Error('Descrição inválida!');
    if (category_id < 1) throw new Error('Categoria inválida!');

    const result = await prismaClient.sector.create({
      data: {
        name: name,
        category_id: category_id,
        color: color,
      },
      select: { id: true, name: true, color: true, category_id: true },
    });

    return result;
  }
}

export { CreateSectorService };
