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

// src/services/family/CreateFamilyService.ts
var CreateFamilyService_exports = {};
__export(CreateFamilyService_exports, {
  CreateFamilyService: () => CreateFamilyService
});
module.exports = __toCommonJS(CreateFamilyService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/family/CreateFamilyService.ts
var CreateFamilyService = class {
  async execute({ name }) {
    if (name === "")
      throw new Error("Nome inv\xE1lido!");
    const familyAlreadyExixts = await prisma_default.family.findFirst({
      where: { name }
    });
    if (familyAlreadyExixts) {
      throw new Error(`Familia '${name}' j\xE1 cadastrada!`);
    }
    const result = await prisma_default.family.create({
      data: {
        name
      },
      select: { id: true, name: true }
    });
    const category_result = await prisma_default.category.create({
      data: {
        family_id: result.id,
        name: "Mercado"
      }
    });
    await prisma_default.sector.create({
      data: {
        category_id: category_result.id,
        name: "Mercearia"
      }
    });
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateFamilyService
});
