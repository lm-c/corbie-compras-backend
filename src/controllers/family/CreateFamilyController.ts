import { Request, Response } from 'express';
import { CreateFamilyService } from '../../services/family/CreateFamilyService';
class CreateFamilyController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const user_id = req.user_id;
    const model = new CreateFamilyService();
    const result = await model.execute({ name });
    return res.json(result);
  }
}

export { CreateFamilyController };
