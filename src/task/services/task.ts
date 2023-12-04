import { Task } from '../model/task';
import { ErrorObject } from '../../utils/error-service';
import {
  criteriaType,
  paginationOptionsType,
  editTaskType,
  createTaskType
} from '../../utils/types';

export const create = async (data: createTaskType) => {
  try {
    const task = await Task.create(data);
    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const getSingle = async (criteria: criteriaType) => {
  try {
    const task = await Task.findOne({ ...criteria });
    if (!task) {
      throw new ErrorObject(400, 'Invalid task');
    }
    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const getAll = async (criteria: criteriaType, options: paginationOptionsType) => {
  try {
    const tasks = await Task.find({ ...criteria })
      .limit(options.limit)
      .skip(options.limit * options.page);
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const update = async (criteria: criteriaType, data: editTaskType) => {
  try {
    const task = await Task.findOne({ ...criteria });
    if (!task) {
      throw new ErrorObject(404, 'Task not found');
    }
    Object.assign(task, data);
    await task.save();
    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const deleteTask = async (criteria: criteriaType) => {
  try {
    const task = await Task.findOne({ ...criteria });
    if (!task) {
      throw new ErrorObject(404, 'Task not found');
    }
    return await Task.deleteOne({ ...criteria });
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const count = async (criteria: criteriaType) => {
  try {
    return await Task.find(criteria).countDocuments();
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const getPending = async () => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tasks = await Task.aggregate([
      { $match: { dueDate: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 }
        }
      }
    ]);
    await Task.populate(tasks, { path: 'user', model: 'User' });
    return tasks;
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};
