import Joi from 'joi';

export const userAuthSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(100)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.max': 'Email cannot exceed {#limit} characters',
      'any.required': 'Email is a required field'
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
      'string.min': 'Password must contain at least {#limit} characters',
      'string.max': 'Password cannot exceed {#limit} characters',
      'any.required': 'Password is a required field'
    })
});

export const userSignUpSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.min': 'Name must contain at least {#limit} characters',
      'string.max': 'Name cannot exceed {#limit} characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
      'any.required': 'Name is a required field'
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(100)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.max': 'Email cannot exceed {#limit} characters',
      'any.required': 'Email is a required field'
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must contain at least {#limit} characters',
      'string.max': 'Password cannot exceed {#limit} characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      'any.required': 'Password is a required field'
    })
});
