import { Response, Request } from 'express';
import { create, getSingle, getAll, update, count, getPending, deleteTask } from '../services/task';
import { pick } from '../../utils/pick';
import { paginationOptions, paginationData } from '../../utils/pagination';

export async function createTask(req: Request, res: Response) {
  const task = await create({ ...req.body, user: req.user });
  res.status(200).send({
    message: 'Task created successfully',
    data: {
      task
    }
  });
}

export async function fetchAll(req: Request, res: Response) {
  const options = paginationOptions(req);

  const filter = pick(req.query, ['status', 'priority']);
  const { search = '' } = req.query;
  const criteria = { ...filter, user: req.user, title: { $regex: search, $options: 'i' } };
  const total = await count(criteria);
  const tasks = await getAll(criteria, options);
  const data = await paginationData(tasks, total, options);
  res.status(200).send({
    message: 'All tasks fetch successfully',
    data
  });
}

export async function fetchOne(req: Request, res: Response) {
  const filter = pick(req.params, ['_id']);
  const task = await getSingle({ ...filter, user: req.user });
  res.status(200).send({
    message: 'Task fetched successfully',
    data: {
      task
    }
  });
}

export async function updateTask(req: Request, res: Response) {
  const filter = pick(req.params, ['_id']);
  const task = await update({ ...filter, user: req.user }, req.body);
  res.status(200).send({
    message: 'Task updated successfully',
    data: {
      task
    }
  });
}

export async function deleteUserTask(req: Request, res: Response) {
  const filter = pick(req.params, ['_id']);
  const task = await deleteTask({ ...filter, user: req.user });
  res.status(200).send({
    message: 'Task deleted successfully',
    data: {
      task
    }
  });
}

export async function pending(req: Request, res: Response) {
  const task = await getPending();
  res.status(200).send({
    message: 'Task updated successfully',
    data: {
      task
    }
  });
}
