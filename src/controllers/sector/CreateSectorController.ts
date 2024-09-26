import { Request, Response } from 'express';
import { CreateSectorService } from '../../services/sector/CreateSectorService';
class CreateSectorController {
  async handle(req: Request, res: Response) {
    const { name, category_id, color } = req.body;

    const model = new CreateSectorService();
    const result = await model.execute({
      name,
      category_id,
      color,
    });
    return res.json(result);
  }
}

export { CreateSectorController };
