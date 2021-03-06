import httpStatus from 'http-status';

import { tokenTypes } from '../config/tokens.js';
import tokenService from './token.service.js';
import userService from './user.service.js';
import ApiError from '../utils/ApiError.js';
import Token from '../models/token.model.js';
import pkg from 'jsonwebtoken';
import logger from '../config/logger.js';
const { TokenExpiredError } = pkg;

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }

  await refreshTokenDoc.remove();
};

const verifyEmail = async (verifyToken) => {
  try {
    const verifyTokenDoc = await tokenService.verifyToken(verifyToken, tokenTypes.VERIFY_EMAIL);

    const user = await userService.getUserById(verifyTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(verifyTokenDoc.user, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ type: tokenTypes.RESET_PASSWORD, user: user.id });
  } catch (error) {
    let message = 'Password reset failed';
    if (TokenExpiredError) {
      message = 'Token expired';
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, message);
  }
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthToken(user);
  } catch (error) {
    let message = 'Unauthrized';
    throw new ApiError(httpStatus.UNAUTHORIZED, message);
  }
};

export default { loginUserWithEmailAndPassword, logout, resetPassword, verifyEmail, refreshAuth };
