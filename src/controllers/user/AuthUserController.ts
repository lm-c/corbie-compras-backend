import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const model = new AuthUserService();
    const result = await model.execute({ email, password });
    return res.json(result);
  }
}

export { AuthUserController };
