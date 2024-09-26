import { Request, Response } from 'express';
import { RemoveTaskService } from '../../services/task/RemoveTaskService';

class RemoveTaskController {
  async handle(req: Request, res: Response) {
    const id = +req.query.id as number;
    const model = new RemoveTaskService();
    const result = await model.execute({ id });
    return res.json(result);
  }
}

export { RemoveTaskController };
