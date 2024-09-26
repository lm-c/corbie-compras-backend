import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';
class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, family_id } = req.body;
    const model = new CreateCategoryService();
    const result = await model.execute({ name, family_id });
    return res.json(result);
  }
}

export { CreateCategoryController };
