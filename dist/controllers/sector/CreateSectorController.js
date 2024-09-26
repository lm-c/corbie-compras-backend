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

// src/controllers/sector/CreateSectorController.ts
var CreateSectorController_exports = {};
__export(CreateSectorController_exports, {
  CreateSectorController: () => CreateSectorController
});
module.exports = __toCommonJS(CreateSectorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/sector/CreateSectorService.ts
var CreateSectorService = class {
  async execute({ name, category_id, color }) {
    if (name === "")
      throw new Error("Descri\xE7\xE3o inv\xE1lida!");
    if (category_id < 1)
      throw new Error("Categoria inv\xE1lida!");
    const result = await prisma_default.sector.create({
      data: {
        name,
        category_id,
        color
      },
      select: { id: true, name: true, color: true, category_id: true }
    });
    return result;
  }
};

// src/controllers/sector/CreateSectorController.ts
var CreateSectorController = class {
  async handle(req, res) {
    const { name, category_id, color } = req.body;
    const model = new CreateSectorService();
    const result = await model.execute({
      name,
      category_id,
      color
    });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateSectorController
});
