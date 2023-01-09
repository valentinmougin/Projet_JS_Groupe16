const ForbiddenError = require("../errors/ForbiddenError");

const ROLES = {
  USER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
};

function checkRole({ minRole }) {
  return function checkRoleMiddleware(req, res, next) {
    const userRole = req.user.role;
    console.log(userRole, minRole);
    if (ROLES[userRole] >= minRole) {
      next();
    } else {
      throw new ForbiddenError();
    }
  };
}

checkRole.ROLES = ROLES;

module.exports = checkRole;