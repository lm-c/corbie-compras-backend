import prismaClient from '../../prisma';

interface SectorRequest {
  id: number;
}

class RemoveSectorService {
  async execute({ id }: SectorRequest) {
    const result = await prismaClient.sector.delete({
      where: { id: id },
    });
    return result;
  }
}

export { RemoveSectorService };
