import prismaClient from '../../prisma';

interface FamilyRequest {
  user_id: number;
}

class ListFamilyByUserService {
  async execute({ user_id }: FamilyRequest) {
    const result = await prismaClient.userFamily.findMany({
      where: { user_id: user_id },
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        family: { select: { id: true, name: true } },
      },
      orderBy: { family: { name: 'asc' } },
    });

    return result;
  }
}

export { ListFamilyByUserService };
