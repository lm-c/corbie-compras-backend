import { Request, Response } from 'express';
import { UpdateUserFamilyService } from '../../services/user/UpdateUserFamilyService';

class UpdateUserFamilyController {
  async handle(req: Request, res: Response) {
    const { family_id } = req.body;
    const user_id = req.user_id;
    const model = new UpdateUserFamilyService();
    const result = await model.execute({ user_id, family_id });
    return res.json(result);
  }
}

export { UpdateUserFamilyController };
