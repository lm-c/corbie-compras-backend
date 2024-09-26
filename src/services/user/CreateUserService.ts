import prismaClient from '../../prisma';
import md5 from 'md5';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  family_id: string;
}

class CreateUserService {
  async execute({ name, email, password, family_id }: UserRequest) {
    if (!name) throw new Error('Nome Inválido!');
    if (!email) throw new Error('Login Inválido!');

    const userAlreadyExixts = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (userAlreadyExixts) {
      await prismaClient.family.delete({
        where: { id: family_id },
      });

      throw new Error(`Usuário \'${email}\' já cadastrado!`);
    }

    const hashPass = md5(password);

    const result = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashPass,
        family_id: family_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        family_id: true,
      },
    });

    return result;
  }
}

export { CreateUserService };
