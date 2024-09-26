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

// src/controllers/user/CreateUserController.ts
var CreateUserController_exports = {};
__export(CreateUserController_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(CreateUserController_exports);

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

// src/controllers/user/CreateUserController.ts
var CreateUserController = class {
  async handle(req, res) {
    const { name, email, password, familyName } = req.body;
    const model = new CreateUserService();
    const modelFamily = new CreateFamilyService();
    const modelUpdateFamily = new UpdateUserFamilyService();
    const resultFamily = await modelFamily.execute({ name: familyName });
    const result = await model.execute({
      name,
      email,
      password,
      family_id: resultFamily.id
    });
    await modelUpdateFamily.execute({
      user_id: result.id,
      family_id: resultFamily.id
    });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
