import { Request, Response } from 'express';
import { ListUnitService } from '../../services/unit/ListUnitService';
class ListUnitController {
  async handle(req: Request, res: Response) {
    const model = new ListUnitService();
    const result = await model.execute();
    return res.json(result);
  }
}

export { ListUnitController };
