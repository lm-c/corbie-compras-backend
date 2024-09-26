import { Request, Response } from 'express';
import { ListFamilyByUserService } from '../../services/family/ListFamilyByUserService';
class ListFamilyByUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const model = new ListFamilyByUserService();

    const result = await model.execute({ user_id });
    return res.json(result);
  }
}

export { ListFamilyByUserController };
