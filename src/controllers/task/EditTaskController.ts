import { Request, Response } from 'express';
import { EditTaskService } from '../../services/task/EditTaskService';

class EditTaskController {
  async handle(req: Request, res: Response) {
    const { id, description, qty, sector_id, unit_id } = req.body;
    const model = new EditTaskService();
    const result = await model.execute({
      id,
      description,
      qty,
      sector_id,
      unit_id,
    });
    return res.json(result);
  }
}

export { EditTaskController };
