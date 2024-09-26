var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/category/CreateCategoryController.ts
var CreateCategoryController_exports = {};
__export(CreateCategoryController_exports, {
  CreateCategoryController: () => CreateCategoryController
});
module.exports = __toCommonJS(CreateCategoryController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/category/CreateCategoryService.ts
var CreateCategoryService = class {
  async execute({ name, family_id }) {
    if (name === "")
      throw new Error("Nome inv\xE1lido!");
    const result = await prisma_default.category.create({
      data: {
        name,
        family_id
      },
      select: { id: true, name: true }
    });
    return result;
  }
};

// src/controllers/category/CreateCategoryController.ts
var CreateCategoryController = class {
  async handle(req, res) {
    const { name, family_id } = req.body;
    const model = new CreateCategoryService();
    const result = await model.execute({ name, family_id });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCategoryController
});
