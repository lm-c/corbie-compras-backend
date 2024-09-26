import prismaClient from '../../prisma';

class DetailUserService {
  async execute(id: number) {
    const result = await prismaClient.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        family_id: true,
        family: { select: { id: true, name: true } },
      },
    });
    return result;
  }
}

export { DetailUserService };
