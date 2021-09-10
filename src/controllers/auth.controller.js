const httpStatus = require('http-status');
const logger = require('../config/logger');

const { userService, tokenService, authService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (res, req) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthToken(user);

  res.send({ user, token });
});

module.exports = {
  register,
  login,
};
