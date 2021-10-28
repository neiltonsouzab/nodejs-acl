import { Router } from 'express';

import { PermissionController } from './controllers/PermissionController';
import { ProductController } from './controllers/ProductController';
import { RoleController } from './controllers/RoleController';
import { SessionController } from './controllers/SessionController';
import { UserACLController } from './controllers/UserACLController';
import { UserController } from './controllers/UserController';
import { can, is } from './middlewares/acl';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const routes = Router();

const sessionController = new SessionController();
const userController = new UserController();
const permissionController = new PermissionController();
const roleController = new RoleController();
const userACLController = new UserACLController();
const productController = new ProductController();

routes.post('/sessions', sessionController.create);

routes.post('/users', userController.create);

routes.post(
  '/permissions',
  ensureAuthenticated,
  is(['admin']),
  permissionController.create,
);

routes.get(
  '/roles',
  ensureAuthenticated,
  is(['admin']),
  roleController.list,
);

routes.post(
  '/roles',
  ensureAuthenticated,
  is(['admin']),
  roleController.create,
);

routes.post(
  '/acl',
  ensureAuthenticated,
  is(['admin']),
  userACLController.create
);

routes.get(
  '/products',
  ensureAuthenticated,
  can(['products.list']),
  productController.list,
);

routes.post(
  '/products',
  ensureAuthenticated,
  can(['products.create']),
  productController.create,
);

export { routes };