import { Request, Response } from 'express';
import { CreateUnitService } from '../../services/unit/CreateUnitService';
class CreateUnitController {
  async handle(req: Request, res: Response) {
    const { abbreviation, name } = req.body;
    const model = new CreateUnitService();
    const result = await model.execute({ abbreviation, name });
    return res.json(result);
  }
}

export { CreateUnitController };
