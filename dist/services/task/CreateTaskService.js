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

// src/services/task/CreateTaskService.ts
var CreateTaskService_exports = {};
__export(CreateTaskService_exports, {
  CreateTaskService: () => CreateTaskService
});
module.exports = __toCommonJS(CreateTaskService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/task/CreateTaskService.ts
var CreateTaskService = class {
  async execute({
    description,
    qty,
    sector_id,
    unit_id,
    user_id
  }) {
    if (qty < 1)
      throw new Error("Quantidade inv\xE1lida!");
    if (description === "")
      throw new Error("Descri\xE7\xE3o inv\xE1lida!");
    if (sector_id < 1)
      throw new Error("Setor inv\xE1lido!");
    if (unit_id < 1)
      throw new Error("Unidade inv\xE1lida!");
    const result = await prisma_default.task.create({
      data: {
        qty,
        description,
        sector_id,
        unit_id,
        user_id
      },
      select: { id: true, description: true, qty: true }
    });
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateTaskService
});
