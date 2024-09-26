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

// src/controllers/user/AuthUserController.ts
var AuthUserController_exports = {};
__export(AuthUserController_exports, {
  AuthUserController: () => AuthUserController
});
module.exports = __toCommonJS(AuthUserController_exports);

// src/services/user/AuthUserService.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_md5 = __toESM(require("md5"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/AuthUserService.ts
var AuthUserService = class {
  async execute({ email, password }) {
    const usuario = await prisma_default.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        family_id: true
      }
    });
    if (!usuario)
      throw new Error("Usu\xE1rio ou senha incorreto!");
    const hashFromDatabase = usuario.password;
    const enteredPasswordHash = (0, import_md5.default)(password);
    const passMatch = enteredPasswordHash === hashFromDatabase;
    if (!passMatch)
      throw new Error("Usu\xE1rio ou senha n\xE3o confere!");
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: usuario.name,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        subject: usuario.id.toString(),
        expiresIn: "30d"
      }
    );
    return {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      token,
      family_id: usuario.family_id
    };
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  async handle(req, res) {
    const { email, password } = req.body;
    const model = new AuthUserService();
    const result = await model.execute({ email, password });
    return res.json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUserController
});
