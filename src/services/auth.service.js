const httpStatus = require('http-status');

const userService = require('./user.service');
const { tokenTypes } = require('../config/tokens');

const ApiError = require('../utils/ApiError');
const Token = require('../models/token.model');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !user.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  console.log(refreshToken);
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }

  await refreshTokenDoc.remove();
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
};
