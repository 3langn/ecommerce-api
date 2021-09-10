const moment = require('moment');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const Token = require('../models/token.model');
const { tokenTypes } = require('../config/tokens');

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklist = false) => {
  const tokenDoc = await Token.create({ token, user: userId, expires: expires.toDate(), type, blacklist });
  return tokenDoc;
};

const generateAuthToken = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: expires,
    },
    refresh: {
      token: refreshToken,
      expires: expires,
    },
  };
};

module.exports = {
  generateToken,
  generateAuthToken,
};