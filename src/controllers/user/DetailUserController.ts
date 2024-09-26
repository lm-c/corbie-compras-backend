import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(req: Request, res: Response) {
    const id = req.user_id;
    const model = new DetailUserService();

    const result = await model.execute(id);
    return res.json(result);
  }
}

export { DetailUserController };
