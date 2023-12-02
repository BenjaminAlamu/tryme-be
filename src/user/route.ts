import express from 'express';
import UserController from './controller';
import { catchAsync } from '../utils/error-service';
import { register, login } from './policy';

import validate from '../utils/validate';

const router = express.Router({ mergeParams: true });

router.post('/register', validate(register), catchAsync(UserController.registerUser));
router.post('/login', validate(login), catchAsync(UserController.loginUser));

export default router;
