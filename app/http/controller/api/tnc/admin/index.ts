import express from 'express';
import { AuthenticationMiddleware } from '../../../../middleware/auth';
export const tncAdminRouter = express.Router();

import { RoleMiddleware } from '../../../../middleware/role';
import { ValidationMiddleware } from '../../../../middleware/validation';
import { TermsAConditions } from './tnc.admin.controller'

let tnc_controller = new TermsAConditions();
let validation_controller = new ValidationMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()
