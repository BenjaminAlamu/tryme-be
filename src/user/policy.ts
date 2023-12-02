/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('@hapi/joi');

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': `Email cannot be an empty field`,
      'string.email': `Email must be valid`,
      'any.required': `Email is a required field`
    }),
    password: Joi.string().required().messages({
      'string.empty': `Password cannot be an empty field`,
      'any.required': `Password is a required field`
    })
  })
};

export const register = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      'string.empty': `Name cannot be an empty field`,
      'any.required': `Name is a required field`
    }),
    email: Joi.string().required().email().messages({
      'string.empty': `Email cannot be an empty field`,
      'string.email': `Email must be valid`,
      'any.required': `Email is a required field`
    }),
    password: Joi.string().required().messages({
      'string.empty': `Password cannot be an empty field`,
      'any.required': `Password is a required field`
    })
  })
};

module.exports = {
  login,
  register
};
