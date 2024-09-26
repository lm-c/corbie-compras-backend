import { Request, Response } from 'express';
import { RemoveSectorService } from '../../services/sector/RemoveSectorService';

class RemoveSectorController {
  async handle(req: Request, res: Response) {
    const id = +req.query.id as number;
    const model = new RemoveSectorService();
    const result = await model.execute({ id });
    return res.json(result);
  }
}

export { RemoveSectorController };
