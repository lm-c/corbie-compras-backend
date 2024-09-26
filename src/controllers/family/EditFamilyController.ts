import { Request, Response } from 'express';
import { EditFamilyService } from '../../services/family/EditFamilyService';

class EditFamilyController {
  async handle(req: Request, res: Response) {
    const { id, name } = req.body;
    const model = new EditFamilyService();
    const result = await model.execute({ id, name });
    return res.json(result);
  }
}

export { EditFamilyController };
