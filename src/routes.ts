import express, { Router } from 'express';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { UpdateUserFamilyController } from './controllers/user/UpdateUserFamilyController';
import { RemoveUserController } from './controllers/user/RemoveUserController';

import { CreateFamilyController } from './controllers/family/CreateFamilyController';
import { EditFamilyController } from './controllers/family/EditFamilyController';
import { ListFamilyByUserController } from './controllers/family/ListFamilyByUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';

import { CreateSectorController } from './controllers/sector/CreateSectorController';
import { ListSectorController } from './controllers/sector/ListSectorController';
import { EditSectorController } from './controllers/sector/EditSectorController';
import { RemoveSectorController } from './controllers/sector/RemoveSectorController';

import { CreateUnitController } from './controllers/unit/CreateUnitController';
import { ListUnitController } from './controllers/unit/ListUnitController';
import { EditUnitController } from './controllers/unit/EditUnitController';
import { RemoveUnitController } from './controllers/unit/RemoveUnitController';

import { CreateTaskController } from './controllers/task/CreateTaskController';
import { ListTaskController } from './controllers/task/ListTaskController';
import { EditTaskController } from './controllers/task/EditTaskController';
import { RemoveTaskController } from './controllers/task/RemoveTaskController';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';

const router = Router();

// --- Rotas USUARIO ---
router.post('/user/cad', new CreateUserController().handle);
router.post('/user/login', new AuthUserController().handle);
router.get('/user/me', isAuthenticated, new DetailUserController().handle);
router.put(
  '/user/upfamily',
  isAuthenticated,
  new UpdateUserFamilyController().handle
);
router.delete('/user/rem', isAuthenticated, new RemoveUserController().handle);

// --- Rotas FAMILIA ---
router.post(
  '/family/cad',
  //isAuthenticated,
  new CreateFamilyController().handle
);
router.put('/family/edit', isAuthenticated, new EditFamilyController().handle);
router.get(
  '/family/cons',
  isAuthenticated,
  new ListFamilyByUserController().handle
);

// --- Rotas CATEGORIA ---
router.post(
  '/category/cad',
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get(
  '/category/cons',
  isAuthenticated,
  new ListCategoryController().handle
);
router.put(
  '/category/edit',
  isAuthenticated,
  new EditCategoryController().handle
);
router.delete(
  '/category/rem',
  isAuthenticated,
  new RemoveCategoryController().handle
);

// --- Rotas SECTOR ---
router.post(
  '/sector/cad',
  isAuthenticated,
  new CreateSectorController().handle
);
router.get('/sector/cons', isAuthenticated, new ListSectorController().handle);
router.put('/sector/edit', isAuthenticated, new EditSectorController().handle);
router.delete(
  '/sector/rem',
  isAuthenticated,
  new RemoveSectorController().handle
);

// --- Rotas UNIDADE ---
router.post('/unit/cad', isAuthenticated, new CreateUnitController().handle);
router.get('/unit/cons', isAuthenticated, new ListUnitController().handle);
router.put('/unit/edit', isAuthenticated, new EditUnitController().handle);
router.delete('/unit/rem', isAuthenticated, new RemoveUnitController().handle);

// --- Rotas TAREFA ---
router.post('/task/cad', isAuthenticated, new CreateTaskController().handle);
router.get('/task/cons', isAuthenticated, new ListTaskController().handle);
router.put('/task/edit', isAuthenticated, new EditTaskController().handle);
router.delete('/task/rem', isAuthenticated, new RemoveTaskController().handle);

export { router };
