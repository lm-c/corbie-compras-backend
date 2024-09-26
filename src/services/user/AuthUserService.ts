import { sign } from "jsonwebtoken";
import md5 from "md5";
import prismaClient from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const usuario = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        family_id: true,
      },
    });

    if (!usuario) throw new Error("Usuário ou senha incorreto!");

    const hashFromDatabase = usuario.password;
    const enteredPasswordHash = md5(password);

    const passMatch = enteredPasswordHash === hashFromDatabase;

    if (!passMatch) throw new Error("Usuário ou senha não confere!");

    const token = sign(
      {
        name: usuario.name,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        subject: usuario.id.toString(),
        expiresIn: "30d",
      }
    );

    return {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      token: token,
      family_id: usuario.family_id,
    };
  }
}

export { AuthUserService };
