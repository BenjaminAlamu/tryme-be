import { Response, Request } from 'express';
import { login, register, generateToken } from '../services/user';

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await login(email, password);
  const token = await generateToken(user);
  res.status(200).send({
    message: 'Registration successful',
    data: {
      user,
      token
    }
  });
}

export async function registerUser(req: Request, res: Response) {
  const user = await register(req.body);
  const token = await generateToken(user);
  res.status(201).send({
    message: 'Registration successful',
    data: {
      user,
      token
    }
  });
}
