const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { model: userModel } = require("./resources/user");

const JWT_SECRET = process.env.JWT_SECRET;

// encrypt the user id & role in the jwt to decode later
const createUserToken = ({ id, role }) =>
  jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "30 days" });

const getUserFromToken = async (token) => {
  try {
    // get the user id from the token
    const user = jwt.verify(token, JWT_SECRET);
    const userProfile = await userModel.findById(user.id);
    return userProfile;
  } catch (e) {
    return null;
  }
};

const authenticated = (next) => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("must authenticate");
  }

  return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`you must have ${role} role`);
  }

  return next(root, args, context, info);
};

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createUserToken,
};
