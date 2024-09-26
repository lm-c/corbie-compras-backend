import { Request, Response } from 'express';
import { RemoveUnitService } from '../../services/unit/RemoveUnitService';

class RemoveUnitController {
  async handle(req: Request, res: Response) {
    const id = +req.query.id as number;
    const model = new RemoveUnitService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
}

export { RemoveUnitController };
