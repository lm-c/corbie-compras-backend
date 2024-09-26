import prismaClient from '../../prisma';
import { UpdateUserFamilyService } from '../user/UpdateUserFamilyService';

interface FamilyRequest {
  name: string;
}
class CreateFamilyService {
  async execute({ name }: FamilyRequest) {
    if (name === '') throw new Error('Nome inválido!');

    const familyAlreadyExixts = await prismaClient.family.findFirst({
      where: { name: name },
    });
    if (familyAlreadyExixts) {
      throw new Error(`Familia \'${name}\' já cadastrada!`);
    }

    const result = await prismaClient.family.create({
      data: {
        name: name,
      },
      select: { id: true, name: true },
    });

    const category_result = await prismaClient.category.create({
      data: {
        family_id: result.id,
        name: 'Mercado',
      },
    });

    await prismaClient.sector.create({
      data: {
        category_id: category_result.id,
        name: 'Mercearia',
      },
    });

    return result;
  }
}

export { CreateFamilyService };
