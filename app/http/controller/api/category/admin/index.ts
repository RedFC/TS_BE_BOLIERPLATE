import express from 'express';
import { AuthenticationMiddleware } from '../../../../middleware/auth';
export const categoryAdminRouter = express.Router();

import { RoleMiddleware } from '../../../../middleware/role';
import { ValidationMiddleware } from '../../../../middleware/validation';
import { Category } from './category.admin.controller'

let category_controller = new Category();
let validation_controller = new ValidationMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()