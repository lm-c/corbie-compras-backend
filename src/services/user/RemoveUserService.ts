import prismaClient from '../../prisma';

interface SectorRequest {
  id: number;
}

class RemoveUserService {
  async execute({ id }: SectorRequest) {
    let families = await prismaClient.userFamily.findMany({
      where: { user: { id: id } },
    });

    const result = await prismaClient.user.delete({
      where: { id: id },
    });

    for (let i = 0; i < families.length; i++) {
      let family = families[i];
      let id_family = family.family_id;
      var cont = await prismaClient.userFamily.count({
        where: { family_id: id_family },
      });

      if (cont === 0) {
        await prismaClient.family.delete({ where: { id: id_family } });
      }
    }

    return result;
  }
}

export { RemoveUserService };
