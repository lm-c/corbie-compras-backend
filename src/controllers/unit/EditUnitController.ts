import { Request, Response } from 'express';
import { EditUnitService } from '../../services/unit/EditUnitService';

class EditUnitController {
  async handle(req: Request, res: Response) {
    const { id, abbreviation, name } = req.body;
    const model = new EditUnitService();
    const result = await model.execute({ id, abbreviation, name });
    return res.json(result);
  }
}

export { EditUnitController };
