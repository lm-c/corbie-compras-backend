var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/user/CreateUserService.ts
var CreateUserService_exports = {};
__export(CreateUserService_exports, {
  CreateUserService: () => CreateUserService
});
module.exports = __toCommonJS(CreateUserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/CreateUserService.ts
var import_md5 = __toESM(require("md5"));
var CreateUserService = class {
  async execute({ name, email, password, family_id }) {
    if (!name)
      throw new Error("Nome Inv\xE1lido!");
    if (!email)
      throw new Error("Login Inv\xE1lido!");
    const userAlreadyExixts = await prisma_default.user.findFirst({
      where: { email }
    });
    if (userAlreadyExixts) {
      await prisma_default.family.delete({
        where: { id: family_id }
      });
      throw new Error(`Usu\xE1rio '${email}' j\xE1 cadastrado!`);
    }
    const hashPass = (0, import_md5.default)(password);
    const result = await prisma_default.user.create({
      data: {
        name,
        email,
        password: hashPass,
        family_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        family_id: true
      }
    });
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserService
});
