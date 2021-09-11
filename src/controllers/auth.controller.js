const httpStatus = require('http-status');
const logger = require('../config/logger');

const { userService, tokenService, authService, emailService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthToken(user);

  res.send({ user, token });
});

const logout = catchAsync(async (req, res) => {
  console.log(req.body.refreshToken);
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateAuthToken(req.body.email);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  /**
   * TODO: check user,
   * FIXME: req.body -> req.user
   */
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.body.user);
  await emailService.sendVerificationEmail(req.body.user.email, verifyEmailToken);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  sendVerificationEmail,
  forgotPassword,
  logout,
};
