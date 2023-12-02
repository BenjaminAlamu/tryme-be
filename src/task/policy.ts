/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('@hapi/joi');
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

export const create = {
  body: Joi.object().keys({
    title: Joi.string().required().messages({
      'string.empty': `Task Title cannot be an empty field`,
      'any.required': `Task Title is a required field`
    }),
    dueDate: Joi.date().required().greater(Date.now()).messages({
      'date.empty': `Due Date cannot be an empty field`,
      'any.required': `Due Date is a required field`,
      'date.greater': `Due Date cannot be in the past`
    }),
    priority: Joi.string().valid('low', 'medium', 'high').required().messages({
      'any.empty': `Priority cannot be an empty field`,
      'string.valid': `Invalid model passed`,
      'any.required': `Priority is a required field`
    }),
    status: Joi.string()
      .valid('pending', 'in-progress', 'completed', 'deleted')
      .required()
      .messages({
        'any.empty': `Status cannot be an empty field`,
        'string.valid': `Invalid model passed`,
        'any.required': `Status is a required field`
      })
  })
};

export const get = {
  params: Joi.object().keys({
    _id: Joi.string().pattern(mongoIdPattern).required().messages({
      'string.empty': `ID Must be passed cannot be an empty field`,
      'any.required': `ID is a required field`,
      'string.pattern': `ID must be a valid Mongo ID`
    })
  })
};
