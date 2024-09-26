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

// src/controllers/sector/EditSectorController.ts
var EditSectorController_exports = {};
__export(EditSectorController_exports, {
  EditSectorController: () => EditSectorController
});
module.exports = __toCommonJS(EditSectorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/sector/EditSectorService.ts
var EditSectorService = class {
  async execute({ id, name, category_id, color }) {
    const result = await prisma_default.sector.update({
      where: { id },
      data: {
        name,
        category_id,
        color,
        updated_at: /* @__PURE__ */ new Date()
      }
    });
    return result;
  }
};

// src/controllers/sector/EditSectorController.ts
var EditSectorController = class {
  async handle(req, res) {
    const { id, name, category_id, color } = req.body;
    const model = new EditSectorService();
    const result = await model.execute({
      id,
      name,
      category_id,
      color
    });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditSectorController
});
