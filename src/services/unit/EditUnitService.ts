import prismaClient from '../../prisma';

interface UnitRequest {
  id: number;
  abbreviation: string;
  name: string;
}

class EditUnitService {
  async execute({ id, abbreviation, name }: UnitRequest) {
    const result = await prismaClient.unit.update({
      where: { id: id },
      data: { abbreviation: abbreviation, name: name, updated_at: new Date() },
    });
    return result;
  }
}

export { EditUnitService };
