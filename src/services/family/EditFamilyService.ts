import prismaClient from '../../prisma';

interface FamilyRequest {
  id: string;
  name: string;
}

class EditFamilyService {
  async execute({ id, name }: FamilyRequest) {
    const result = await prismaClient.family.update({
      where: { id: id },
      data: { name: name, updated_at: new Date() },
    });
    return result;
  }
}

export { EditFamilyService };
