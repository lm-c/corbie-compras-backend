import { Request, Response } from 'express';
import { ListSectorService } from '../../services/sector/ListSectorService';
class ListSectorController {
  async handle(req: Request, res: Response) {
    const category_id = +req.query.category_id as number;

    const model = new ListSectorService();
    const result = await model.execute({ category_id });
    return res.json(result);
  }
}

export { ListSectorController };
