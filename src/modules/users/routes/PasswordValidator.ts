import { celebrate, Segments, Joi } from 'celebrate';

export const emailValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export const resetValidator = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});
