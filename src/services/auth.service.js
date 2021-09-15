const httpStatus = require('http-status');

const { tokenTypes } = require('../config/tokens');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const Token = require('../models/token.model');
const logger = require('../config/logger');
const { TokenExpiredError } = require('jsonwebtoken');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !user.isPasswordMatch(password)) {
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
    logger.debug(verifyToken);

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

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  resetPassword,
  verifyEmail,
  refreshAuth,
};
