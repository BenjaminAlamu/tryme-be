import { Task } from '../model/task';
import { ErrorObject } from '../../utils/error-service';

export const create = async (data: any) => {
  try {
    const task = await Task.create(data);
    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const getSingle = async (criteria: object) => {
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

export const getAll = async (criteria: object) => {
  try {
    const tasks = await Task.find({ ...criteria });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const update = async (criteria: object, data: any) => {
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
