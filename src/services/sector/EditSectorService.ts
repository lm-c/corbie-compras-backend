import prismaClient from '../../prisma';

interface SectorRequest {
  id: number;
  name: string;
  category_id: number;
  color: string;
}

class EditSectorService {
  async execute({ id, name, category_id, color }: SectorRequest) {
    const result = await prismaClient.sector.update({
      where: { id: id },
      data: {
        name: name,
        category_id: category_id,
        color: color,
        updated_at: new Date(),
      },
    });
    return result;
  }
}

export { EditSectorService };
