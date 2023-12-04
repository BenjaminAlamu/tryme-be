import express from 'express';
import TaskController from './controller';
import { catchAsync } from '../utils/error-service';
import { create, get } from './policy';
import { validateToken } from '../user/services/user';

import validate from '../utils/validate';

const router = express.Router({ mergeParams: true });

router.post('/create', validateToken, validate(create), catchAsync(TaskController.createTask));
router.get('/test', catchAsync(TaskController.pending));
router.put('/:_id', validateToken, validate(get), catchAsync(TaskController.updateTask));
router.delete('/:_id', validateToken, validate(get), catchAsync(TaskController.deleteUserTask));
router.get('/:_id', validateToken, validate(get), catchAsync(TaskController.fetchOne));
router.get('/', validateToken, catchAsync(TaskController.fetchAll));

export default router;
