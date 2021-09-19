import httpStatus from 'http-status';
import passport from 'passport';
import ApiError from '../utils/ApiError.js';
import { roleRights } from '../config/roles.js';

const verifyCallback = (req, resolve, reject, requireRights) => (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please Authentication'));
  }
  req.user = user;

  if (requireRights.length) {
    const userRights = roleRights.get(user.role);

    const hasRequiredRights = requireRights.every((requiredRight) => requiredRight.include(userRights));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requireRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requireRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
