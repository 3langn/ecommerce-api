import Joi from 'joi';
import { password } from './custom.validation.js';

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export default { register, login, logout, forgotPassword, resetPassword, verifyEmail, refreshToken };
