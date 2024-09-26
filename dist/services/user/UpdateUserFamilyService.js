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

// src/services/user/UpdateUserFamilyService.ts
var UpdateUserFamilyService_exports = {};
__export(UpdateUserFamilyService_exports, {
  UpdateUserFamilyService: () => UpdateUserFamilyService
});
module.exports = __toCommonJS(UpdateUserFamilyService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/UpdateUserFamilyService.ts
var UpdateUserFamilyService = class {
  async execute({ user_id, family_id }) {
    const result = await prisma_default.user.update({
      where: { id: user_id },
      data: { family_id, updated_at: /* @__PURE__ */ new Date() }
    });
    const userFamilyAlreadyExixts = await prisma_default.userFamily.findFirst({
      where: { family_id, user_id }
    });
    if (!userFamilyAlreadyExixts) {
      await prisma_default.userFamily.create({
        data: {
          family_id,
          user_id
        }
      });
    }
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserFamilyService
});
