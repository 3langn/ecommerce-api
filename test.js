const logger = require('./src/config/logger');

const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const user = {
  role: 'admin',
};

const userRights = roleRights.get(user.role);
logger.info(JSON.stringify(userRights));

requiredRights = ['getUsers'];

const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
logger.info(hasRequiredRights);
