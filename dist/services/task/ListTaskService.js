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

// src/services/task/ListTaskService.ts
var ListTaskService_exports = {};
__export(ListTaskService_exports, {
  ListTaskService: () => ListTaskService
});
module.exports = __toCommonJS(ListTaskService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/task/ListTaskService.ts
var ListTaskService = class {
  async execute({ category_id }) {
    if (category_id < 1)
      throw new Error("Categoria inv\xE1lida!");
    const result = await prisma_default.task.findMany({
      where: { sector: { category_id } },
      select: {
        id: true,
        description: true,
        qty: true,
        unit: { select: { id: true, abbreviation: true } },
        sector: {
          select: {
            id: true,
            name: true,
            color: true,
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: [{ sector_id: "asc" }, { updated_at: "desc" }]
    });
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListTaskService
});
