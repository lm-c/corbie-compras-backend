import { Request, Response } from 'express';
import { CreateTaskService } from '../../services/task/CreateTaskService';
class CreateTaskController {
  async handle(req: Request, res: Response) {
    const { description, qty, sector_id, unit_id } = req.body;
    const user_id = req.user_id;

    const model = new CreateTaskService();
    const result = await model.execute({
      description,
      qty,
      sector_id,
      unit_id,
      user_id,
    });
    return res.json(result);
  }
}

export { CreateTaskController };
