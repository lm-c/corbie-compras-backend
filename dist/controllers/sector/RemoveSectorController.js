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

// src/controllers/sector/RemoveSectorController.ts
var RemoveSectorController_exports = {};
__export(RemoveSectorController_exports, {
  RemoveSectorController: () => RemoveSectorController
});
module.exports = __toCommonJS(RemoveSectorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/sector/RemoveSectorService.ts
var RemoveSectorService = class {
  async execute({ id }) {
    const result = await prisma_default.sector.delete({
      where: { id }
    });
    return result;
  }
};

// src/controllers/sector/RemoveSectorController.ts
var RemoveSectorController = class {
  async handle(req, res) {
    const id = +req.query.id;
    const model = new RemoveSectorService();
    const result = await model.execute({ id });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveSectorController
});
