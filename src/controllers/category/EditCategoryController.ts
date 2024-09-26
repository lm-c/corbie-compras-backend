import { Request, Response } from 'express';
import { EditCategoryService } from '../../services/category/EditCategoryService';

class EditCategoryController {
  async handle(req: Request, res: Response) {
    const { id, name } = req.body;
    const model = new EditCategoryService();
    const result = await model.execute({ id, name });
    return res.json(result);
  }
}

export { EditCategoryController };
