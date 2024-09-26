import prismaClient from '../../prisma';

interface UnitRequest {
  abbreviation: string;
  name: string;
}
class CreateUnitService {
  async execute({ abbreviation, name }: UnitRequest) {
    if (name === '') throw new Error('Nome inválido!');
    if (abbreviation === '') throw new Error('Sigla inválida!');

    const result = await prismaClient.unit.create({
      data: {
        name: name,
        abbreviation: abbreviation,
      },
      select: { id: true, abbreviation: true, name: true },
    });

    return result;
  }
}

export { CreateUnitService };
