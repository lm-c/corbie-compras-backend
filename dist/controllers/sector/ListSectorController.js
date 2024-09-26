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

// src/controllers/sector/ListSectorController.ts
var ListSectorController_exports = {};
__export(ListSectorController_exports, {
  ListSectorController: () => ListSectorController
});
module.exports = __toCommonJS(ListSectorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/sector/ListSectorService.ts
var ListSectorService = class {
  async execute({ category_id }) {
    if (category_id < 1)
      throw new Error("Categoria inv\xE1lida!");
    const result = await prisma_default.sector.findMany({
      where: { category_id },
      select: {
        id: true,
        name: true,
        color: true,
        category: { select: { id: true, name: true } }
      },
      orderBy: { name: "asc" }
    });
    return result;
  }
};

// src/controllers/sector/ListSectorController.ts
var ListSectorController = class {
  async handle(req, res) {
    const category_id = +req.query.category_id;
    const model = new ListSectorService();
    const result = await model.execute({ category_id });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListSectorController
});
