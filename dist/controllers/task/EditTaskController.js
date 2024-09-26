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

// src/controllers/task/EditTaskController.ts
var EditTaskController_exports = {};
__export(EditTaskController_exports, {
  EditTaskController: () => EditTaskController
});
module.exports = __toCommonJS(EditTaskController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditTaskController
});
