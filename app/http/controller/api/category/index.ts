import express from 'express';
import { AuthenticationMiddleware } from '../../../middleware/auth';
export const categoryRouter = express.Router();

import { upload } from "../../../../constants/multer";
import { RoleMiddleware } from '../../../middleware/role';
import { ValidationMiddleware } from '../../../middleware/validation';
import { Category } from './category.controller'
import { CacheMiddleware } from '../../../middleware/cache';

let category_controller = new Category();
let validation_controller = new ValidationMiddleware()
let cache_controller = new CacheMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()

categoryRouter.post('/',
  auth_controller.isAuthenticated(),
  role_controller.isAdmin(),
  category_controller.createCategory);

categoryRouter.post('/subcategory/',
  auth_controller.isAuthenticated(),
  role_controller.isAdmin(),
  category_controller.createSubCategory);