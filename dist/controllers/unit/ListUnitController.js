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

// src/controllers/unit/ListUnitController.ts
var ListUnitController_exports = {};
__export(ListUnitController_exports, {
  ListUnitController: () => ListUnitController
});
module.exports = __toCommonJS(ListUnitController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/unit/ListUnitService.ts
var ListUnitService = class {
  async execute() {
    const result = await prisma_default.unit.findMany({
      select: {
        id: true,
        abbreviation: true,
        name: true
      },
      orderBy: { abbreviation: "asc" }
    });
    return result;
  }
};

// src/controllers/unit/ListUnitController.ts
var ListUnitController = class {
  async handle(req, res) {
    const model = new ListUnitService();
    const result = await model.execute();
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListUnitController
});
