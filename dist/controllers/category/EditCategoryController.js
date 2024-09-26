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

// src/controllers/category/EditCategoryController.ts
var EditCategoryController_exports = {};
__export(EditCategoryController_exports, {
  EditCategoryController: () => EditCategoryController
});
module.exports = __toCommonJS(EditCategoryController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/category/EditCategoryService.ts
var EditCategoryService = class {
  async execute({ id, name }) {
    const result = await prisma_default.category.update({
      where: { id },
      data: { name, updated_at: /* @__PURE__ */ new Date() }
    });
    return result;
  }
};

// src/controllers/category/EditCategoryController.ts
var EditCategoryController = class {
  async handle(req, res) {
    const { id, name } = req.body;
    const model = new EditCategoryService();
    const result = await model.execute({ id, name });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditCategoryController
});
