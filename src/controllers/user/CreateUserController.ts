import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { CreateFamilyService } from '../../services/family/CreateFamilyService';
import { UpdateUserFamilyService } from '../../services/user/UpdateUserFamilyService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, familyName } = req.body;
    const model = new CreateUserService();
    const modelFamily = new CreateFamilyService();
    const modelUpdateFamily = new UpdateUserFamilyService();

    const resultFamily = await modelFamily.execute({ name: familyName });

    const result = await model.execute({
      name,
      email,
      password,
      family_id: resultFamily.id,
    });

    await modelUpdateFamily.execute({
      user_id: result.id,
      family_id: resultFamily.id,
    });

    return res.json(result);
  }
}

export { CreateUserController };
