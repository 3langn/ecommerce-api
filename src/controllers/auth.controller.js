const httpStatus = require('http-status');

const { userService, tokenService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
  register,
};
