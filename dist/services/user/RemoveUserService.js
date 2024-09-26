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

// src/services/user/RemoveUserService.ts
var RemoveUserService_exports = {};
__export(RemoveUserService_exports, {
  RemoveUserService: () => RemoveUserService
});
module.exports = __toCommonJS(RemoveUserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/RemoveUserService.ts
var RemoveUserService = class {
  async execute({ id }) {
    let families = await prisma_default.userFamily.findMany({
      where: { user: { id } }
    });
    const result = await prisma_default.user.delete({
      where: { id }
    });
    for (let i = 0; i < families.length; i++) {
      let family = families[i];
      let id_family = family.family_id;
      var cont = await prisma_default.userFamily.count({
        where: { family_id: id_family }
      });
      if (cont === 0) {
        await prisma_default.family.delete({ where: { id: id_family } });
      }
    }
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveUserService
});
