import { Request, Response } from 'express';
import { ListTaskService } from '../../services/task/ListTaskService';
class ListTaskController {
  async handle(req: Request, res: Response) {
    const category_id = +req.query.category_id as number;

    const model = new ListTaskService();
    const result = await model.execute({ category_id });
    return res.json(result);
  }
}

export { ListTaskController };
