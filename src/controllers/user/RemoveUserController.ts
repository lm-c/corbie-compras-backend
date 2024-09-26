import { Request, Response } from 'express';
import { RemoveUserService } from '../../services/user/RemoveUserService';

class RemoveUserController {
  async handle(req: Request, res: Response) {
    const id = req.user_id;
    const model = new RemoveUserService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
}

export { RemoveUserController };
