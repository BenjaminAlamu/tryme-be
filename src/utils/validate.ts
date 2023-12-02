/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
import { NextFunction, Request, Response } from 'express';
import Joi from '@hapi/joi';
import { ErrorObject } from './error-service';
import { pick } from './pick';

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details: any) => details.message).join(', ');
    return next(new ErrorObject(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
