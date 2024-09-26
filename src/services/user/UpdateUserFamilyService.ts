import prismaClient from '../../prisma';

interface UpdateUserFamilyRequest {
  user_id: number;
  family_id: string;
}

class UpdateUserFamilyService {
  async execute({ user_id, family_id }: UpdateUserFamilyRequest) {
    const result = await prismaClient.user.update({
      where: { id: user_id },
      data: { family_id: family_id, updated_at: new Date() },
    });

    const userFamilyAlreadyExixts = await prismaClient.userFamily.findFirst({
      where: { family_id: family_id, user_id: user_id },
    });

    if (!userFamilyAlreadyExixts) {
      await prismaClient.userFamily.create({
        data: {
          family_id: family_id,
          user_id: user_id,
        },
      });
    }

    return result;
  }
}

export { UpdateUserFamilyService };
