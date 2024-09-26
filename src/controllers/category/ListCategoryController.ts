import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';
class ListCategoryController {
  async handle(req: Request, res: Response) {
    const family_id = req.query.family_id as string;
    const model = new ListCategoryService();
    const result = await model.execute({ family_id });
    return res.json(result);
  }
}

export { ListCategoryController };
