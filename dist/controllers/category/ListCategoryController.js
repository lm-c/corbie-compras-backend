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

// src/controllers/category/ListCategoryController.ts
var ListCategoryController_exports = {};
__export(ListCategoryController_exports, {
  ListCategoryController: () => ListCategoryController
});
module.exports = __toCommonJS(ListCategoryController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/category/ListCategoryService.ts
var ListCategoryService = class {
  async execute({ family_id }) {
    const result = await prisma_default.category.findMany({
      where: { family_id },
      select: {
        id: true,
        name: true
      },
      orderBy: { name: "asc" }
    });
    return result;
  }
};

// src/controllers/category/ListCategoryController.ts
var ListCategoryController = class {
  async handle(req, res) {
    const family_id = req.query.family_id;
    const model = new ListCategoryService();
    const result = await model.execute({ family_id });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListCategoryController
});
