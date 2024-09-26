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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/middlewares/isAuthenticated.ts
var import_jsonwebtoken = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken)
    return res.status(401).end();
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken.verify)(token, process.env.JWT_SECRET);
    req.user_id = +sub;
    return next();
  } catch (err) {
    return res.status(401);
  }
}

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

// src/services/user/AuthUserService.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
var import_md52 = __toESM(require("md5"));
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
    const enteredPasswordHash = (0, import_md52.default)(password);
    const passMatch = enteredPasswordHash === hashFromDatabase;
    if (!passMatch)
      throw new Error("Usu\xE1rio ou senha n\xE3o confere!");
    const token = (0, import_jsonwebtoken2.sign)(
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

// src/controllers/user/UpdateUserFamilyController.ts
var UpdateUserFamilyController = class {
  async handle(req, res) {
    const { family_id } = req.body;
    const user_id = req.user_id;
    const model = new UpdateUserFamilyService();
    const result = await model.execute({ user_id, family_id });
    return res.json(result);
  }
};

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

// src/controllers/user/RemoveUserController.ts
var RemoveUserController = class {
  async handle(req, res) {
    const id = req.user_id;
    const model = new RemoveUserService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
};

// src/controllers/family/CreateFamilyController.ts
var CreateFamilyController = class {
  async handle(req, res) {
    const { name } = req.body;
    const user_id = req.user_id;
    const model = new CreateFamilyService();
    const result = await model.execute({ name });
    return res.json(result);
  }
};

// src/services/family/EditFamilyService.ts
var EditFamilyService = class {
  async execute({ id, name }) {
    const result = await prisma_default.family.update({
      where: { id },
      data: { name, updated_at: /* @__PURE__ */ new Date() }
    });
    return result;
  }
};

// src/controllers/family/EditFamilyController.ts
var EditFamilyController = class {
  async handle(req, res) {
    const { id, name } = req.body;
    const model = new EditFamilyService();
    const result = await model.execute({ id, name });
    return res.json(result);
  }
};

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

// src/services/category/CreateCategoryService.ts
var CreateCategoryService = class {
  async execute({ name, family_id }) {
    if (name === "")
      throw new Error("Nome inv\xE1lido!");
    const result = await prisma_default.category.create({
      data: {
        name,
        family_id
      },
      select: { id: true, name: true }
    });
    return result;
  }
};

// src/controllers/category/CreateCategoryController.ts
var CreateCategoryController = class {
  async handle(req, res) {
    const { name, family_id } = req.body;
    const model = new CreateCategoryService();
    const result = await model.execute({ name, family_id });
    return res.json(result);
  }
};

// src/services/category/ListCategoryService.ts
var ListCategoryService = class {
  async execute({ family_id }) {
    const result = await prisma_default.category.findMany({
      where: { family_id },
      select: {
        id: true,
        name: true
      },
      orderBy: { name: "asc" }
    });
    return result;
  }
};

// src/controllers/category/ListCategoryController.ts
var ListCategoryController = class {
  async handle(req, res) {
    const family_id = req.query.family_id;
    const model = new ListCategoryService();
    const result = await model.execute({ family_id });
    return res.json(result);
  }
};

// src/services/category/EditCategoryService.ts
var EditCategoryService = class {
  async execute({ id, name }) {
    const result = await prisma_default.category.update({
      where: { id },
      data: { name, updated_at: /* @__PURE__ */ new Date() }
    });
    return result;
  }
};

// src/controllers/category/EditCategoryController.ts
var EditCategoryController = class {
  async handle(req, res) {
    const { id, name } = req.body;
    const model = new EditCategoryService();
    const result = await model.execute({ id, name });
    return res.json(result);
  }
};

// src/services/sector/CreateSectorService.ts
var CreateSectorService = class {
  async execute({ name, category_id, color }) {
    if (name === "")
      throw new Error("Descri\xE7\xE3o inv\xE1lida!");
    if (category_id < 1)
      throw new Error("Categoria inv\xE1lida!");
    const result = await prisma_default.sector.create({
      data: {
        name,
        category_id,
        color
      },
      select: { id: true, name: true, color: true, category_id: true }
    });
    return result;
  }
};

// src/controllers/sector/CreateSectorController.ts
var CreateSectorController = class {
  async handle(req, res) {
    const { name, category_id, color } = req.body;
    const model = new CreateSectorService();
    const result = await model.execute({
      name,
      category_id,
      color
    });
    return res.json(result);
  }
};

// src/services/sector/ListSectorService.ts
var ListSectorService = class {
  async execute({ category_id }) {
    if (category_id < 1)
      throw new Error("Categoria inv\xE1lida!");
    const result = await prisma_default.sector.findMany({
      where: { category_id },
      select: {
        id: true,
        name: true,
        color: true,
        category: { select: { id: true, name: true } }
      },
      orderBy: { name: "asc" }
    });
    return result;
  }
};

// src/controllers/sector/ListSectorController.ts
var ListSectorController = class {
  async handle(req, res) {
    const category_id = +req.query.category_id;
    const model = new ListSectorService();
    const result = await model.execute({ category_id });
    return res.json(result);
  }
};

// src/services/sector/EditSectorService.ts
var EditSectorService = class {
  async execute({ id, name, category_id, color }) {
    const result = await prisma_default.sector.update({
      where: { id },
      data: {
        name,
        category_id,
        color,
        updated_at: /* @__PURE__ */ new Date()
      }
    });
    return result;
  }
};

// src/controllers/sector/EditSectorController.ts
var EditSectorController = class {
  async handle(req, res) {
    const { id, name, category_id, color } = req.body;
    const model = new EditSectorService();
    const result = await model.execute({
      id,
      name,
      category_id,
      color
    });
    return res.json(result);
  }
};

// src/services/sector/RemoveSectorService.ts
var RemoveSectorService = class {
  async execute({ id }) {
    const result = await prisma_default.sector.delete({
      where: { id }
    });
    return result;
  }
};

// src/controllers/sector/RemoveSectorController.ts
var RemoveSectorController = class {
  async handle(req, res) {
    const id = +req.query.id;
    const model = new RemoveSectorService();
    const result = await model.execute({ id });
    return res.json(result);
  }
};

// src/services/unit/CreateUnitService.ts
var CreateUnitService = class {
  async execute({ abbreviation, name }) {
    if (name === "")
      throw new Error("Nome inv\xE1lido!");
    if (abbreviation === "")
      throw new Error("Sigla inv\xE1lida!");
    const result = await prisma_default.unit.create({
      data: {
        name,
        abbreviation
      },
      select: { id: true, abbreviation: true, name: true }
    });
    return result;
  }
};

// src/controllers/unit/CreateUnitController.ts
var CreateUnitController = class {
  async handle(req, res) {
    const { abbreviation, name } = req.body;
    const model = new CreateUnitService();
    const result = await model.execute({ abbreviation, name });
    return res.json(result);
  }
};

// src/services/unit/ListUnitService.ts
var ListUnitService = class {
  async execute() {
    const result = await prisma_default.unit.findMany({
      select: {
        id: true,
        abbreviation: true,
        name: true
      },
      orderBy: { abbreviation: "asc" }
    });
    return result;
  }
};

// src/controllers/unit/ListUnitController.ts
var ListUnitController = class {
  async handle(req, res) {
    const model = new ListUnitService();
    const result = await model.execute();
    return res.json(result);
  }
};

// src/services/unit/EditUnitService.ts
var EditUnitService = class {
  async execute({ id, abbreviation, name }) {
    const result = await prisma_default.unit.update({
      where: { id },
      data: { abbreviation, name, updated_at: /* @__PURE__ */ new Date() }
    });
    return result;
  }
};

// src/controllers/unit/EditUnitController.ts
var EditUnitController = class {
  async handle(req, res) {
    const { id, abbreviation, name } = req.body;
    const model = new EditUnitService();
    const result = await model.execute({ id, abbreviation, name });
    return res.json(result);
  }
};

// src/services/unit/RemoveUnitService.ts
var RemoveUnitService = class {
  async execute({ id }) {
    const count = await prisma_default.task.count({ where: { unit_id: id } });
    if (count > 0)
      return {
        msg: "Informamos que esta unidade j\xE1 foi utilizada em uma compra realizada em nossa plataforma"
      };
    const result = await prisma_default.unit.delete({
      where: { id }
    });
    return result;
  }
};

// src/controllers/unit/RemoveUnitController.ts
var RemoveUnitController = class {
  async handle(req, res) {
    const id = +req.query.id;
    const model = new RemoveUnitService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
};

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

// src/controllers/task/CreateTaskController.ts
var CreateTaskController = class {
  async handle(req, res) {
    const { description, qty, sector_id, unit_id } = req.body;
    const user_id = req.user_id;
    const model = new CreateTaskService();
    const result = await model.execute({
      description,
      qty,
      sector_id,
      unit_id,
      user_id
    });
    return res.json(result);
  }
};

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

// src/controllers/task/ListTaskController.ts
var ListTaskController = class {
  async handle(req, res) {
    const category_id = +req.query.category_id;
    const model = new ListTaskService();
    const result = await model.execute({ category_id });
    return res.json(result);
  }
};

// src/services/task/EditTaskService.ts
var EditTaskService = class {
  async execute({ id, description, qty, sector_id, unit_id }) {
    const result = await prisma_default.task.update({
      where: { id },
      data: {
        description,
        qty,
        sector_id,
        unit_id,
        updated_at: /* @__PURE__ */ new Date()
      }
    });
    return result;
  }
};

// src/controllers/task/EditTaskController.ts
var EditTaskController = class {
  async handle(req, res) {
    const { id, description, qty, sector_id, unit_id } = req.body;
    const model = new EditTaskService();
    const result = await model.execute({
      id,
      description,
      qty,
      sector_id,
      unit_id
    });
    return res.json(result);
  }
};

// src/services/task/RemoveTaskService.ts
var RemoveTaskService = class {
  async execute({ id }) {
    const result = await prisma_default.task.delete({
      where: { id }
    });
    return result;
  }
};

// src/controllers/task/RemoveTaskController.ts
var RemoveTaskController = class {
  async handle(req, res) {
    const id = +req.query.id;
    const model = new RemoveTaskService();
    const result = await model.execute({ id });
    return res.json(result);
  }
};

// src/services/category/RemoveCategoryService.ts
var RemoveCategoryService = class {
  async execute({ id }) {
    const result = await prisma_default.category.delete({
      where: { id }
    });
    return result;
  }
};

// src/controllers/category/RemoveCategoryController.ts
var RemoveCategoryController = class {
  async handle(req, res) {
    const id = +req.query.id;
    const model = new RemoveCategoryService();
    const result = await model.execute({ id });
    return result != null ? res.json(result) : null;
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.post("/user/cad", new CreateUserController().handle);
router.post("/user/login", new AuthUserController().handle);
router.get("/user/me", isAuthenticated, new DetailUserController().handle);
router.put(
  "/user/upfamily",
  isAuthenticated,
  new UpdateUserFamilyController().handle
);
router.delete("/user/rem", isAuthenticated, new RemoveUserController().handle);
router.post(
  "/family/cad",
  //isAuthenticated,
  new CreateFamilyController().handle
);
router.put("/family/edit", isAuthenticated, new EditFamilyController().handle);
router.get(
  "/family/cons",
  isAuthenticated,
  new ListFamilyByUserController().handle
);
router.post(
  "/category/cad",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get(
  "/category/cons",
  isAuthenticated,
  new ListCategoryController().handle
);
router.put(
  "/category/edit",
  isAuthenticated,
  new EditCategoryController().handle
);
router.delete(
  "/category/rem",
  isAuthenticated,
  new RemoveCategoryController().handle
);
router.post(
  "/sector/cad",
  isAuthenticated,
  new CreateSectorController().handle
);
router.get("/sector/cons", isAuthenticated, new ListSectorController().handle);
router.put("/sector/edit", isAuthenticated, new EditSectorController().handle);
router.delete(
  "/sector/rem",
  isAuthenticated,
  new RemoveSectorController().handle
);
router.post("/unit/cad", isAuthenticated, new CreateUnitController().handle);
router.get("/unit/cons", isAuthenticated, new ListUnitController().handle);
router.put("/unit/edit", isAuthenticated, new EditUnitController().handle);
router.delete("/unit/rem", isAuthenticated, new RemoveUnitController().handle);
router.post("/task/cad", isAuthenticated, new CreateTaskController().handle);
router.get("/task/cons", isAuthenticated, new ListTaskController().handle);
router.put("/task/edit", isAuthenticated, new EditTaskController().handle);
router.delete("/task/rem", isAuthenticated, new RemoveTaskController().handle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
