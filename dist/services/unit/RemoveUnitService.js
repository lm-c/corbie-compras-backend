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

// src/services/unit/RemoveUnitService.ts
var RemoveUnitService_exports = {};
__export(RemoveUnitService_exports, {
  RemoveUnitService: () => RemoveUnitService
});
module.exports = __toCommonJS(RemoveUnitService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/unit/RemoveUnitService.ts
var RemoveUnitService = class {
  async execute({ id }) {
    const count = await prisma_default.task.count({ where: { unit_id: id } });
    if (count > 0)
      return {
        msg: "Informamos que esta unidade j\xE1 foi utilizada em uma compra realizada em nossa plataforma"
      };
    const result = await prisma_default.unit.delete({
      where: { id }
    });
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveUnitService
});
