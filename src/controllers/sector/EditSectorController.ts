import { Request, Response } from 'express';
import { EditSectorService } from '../../services/sector/EditSectorService';

class EditSectorController {
  async handle(req: Request, res: Response) {
    const { id, name, category_id, color } = req.body;
    const model = new EditSectorService();
    const result = await model.execute({
      id,
      name,
      category_id,
      color,
    });
    return res.json(result);
  }
}

export { EditSectorController };
