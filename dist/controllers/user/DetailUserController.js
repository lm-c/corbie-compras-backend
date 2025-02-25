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

// src/controllers/user/DetailUserController.ts
var DetailUserController_exports = {};
__export(DetailUserController_exports, {
  DetailUserController: () => DetailUserController
});
module.exports = __toCommonJS(DetailUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/DetailUserService.ts
var DetailUserService = class {
  async execute(id) {
    const result = await prisma_default.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        family_id: true,
        family: { select: { id: true, name: true } }
      }
    });
    return result;
  }
};

// src/controllers/user/DetailUserController.ts
var DetailUserController = class {
  async handle(req, res) {
    const id = req.user_id;
    const model = new DetailUserService();
    const result = await model.execute(id);
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailUserController
});
