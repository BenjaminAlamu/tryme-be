/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getSeconds, addHours } from 'date-fns';
import { User } from '../model/user';
import { ErrorObject } from '../../utils/error-service';
import { loginUser, userType, decodeUserType } from '../../utils/types';

export const comparePassword = async (entered: string, user: userType) => {
  try {
    const result = await bcrypt.compare(entered, user.password);
    if (!result) {
      throw new ErrorObject(400, 'Invalid email or password');
    }
    return result;
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const register = async (data: loginUser) => {
  try {
    let user = await User.findOne({ email: data.email });
    if (user) {
      throw new ErrorObject(400, 'User with that email already exists');
    }
    const password = await bcrypt.hash(data.password, 10);
    user = await User.create({ ...data, password });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorObject(400, 'Invalid email or password');
  }
  await comparePassword(password, user);
  return user;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorObject(400, 'Invalid user');
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const getUserById = async (_id: string) => {
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw new ErrorObject(400, 'Invalid user');
    }

    const data = {
      user: JSON.parse(JSON.stringify(user))
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new ErrorObject(error.code || 500, error.message || error);
  }
};

export const generateToken = async (user: userType) => {
  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    sub: user._id,
    user,
    iat: getSeconds(new Date()),
    nb: getSeconds(new Date()),
    exp: getSeconds(addHours(new Date(), 24))
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

export const validateToken = function (req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    throw new ErrorObject(400, 'You need to attach a token');
  }
  const bearer = bearerHeader.split(' ');
  const [, token] = bearer;
  req.token = token;
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err: any, authData: decodeUserType | null) => {
    if (err) {
      throw new ErrorObject(400, err.toString());
    } else {
      req.user = authData.user; // Add User Id to request
      next();
    }
  });
};
