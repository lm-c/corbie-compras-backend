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

// src/controllers/family/ListFamilyByUserController.ts
var ListFamilyByUserController_exports = {};
__export(ListFamilyByUserController_exports, {
  ListFamilyByUserController: () => ListFamilyByUserController
});
module.exports = __toCommonJS(ListFamilyByUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/family/ListFamilyByUserService.ts
var ListFamilyByUserService = class {
  async execute({ user_id }) {
    const result = await prisma_default.userFamily.findMany({
      where: { user_id },
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        family: { select: { id: true, name: true } }
      },
      orderBy: { family: { name: "asc" } }
    });
    return result;
  }
};

// src/controllers/family/ListFamilyByUserController.ts
var ListFamilyByUserController = class {
  async handle(req, res) {
    const user_id = req.user_id;
    const model = new ListFamilyByUserService();
    const result = await model.execute({ user_id });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListFamilyByUserController
});
