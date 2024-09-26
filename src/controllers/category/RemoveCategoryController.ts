import { Request, Response } from 'express';
import { RemoveCategoryService } from '../../services/category/RemoveCategoryService';

class RemoveCategoryController {
  async handle(req: Request, res: Response) {
    const id = +req.query.id as number;
    const model = new RemoveCategoryService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
}

export { RemoveCategoryController };
