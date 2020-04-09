const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { model: userModel } = require("./resources/user");

const JWT_SECRET = process.env.JWT_SECRET;

// encrypt the user id & role in the jwt to decode later
const createUserToken = ({ id, role }) =>
  jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "30 days" });

const getUserFromToken = async (authorizationHeader) => {
  try {
    const token = authorizationHeader.replace("Bearer ", "");
    // get the user id from the token
    const user = jwt.verify(token, JWT_SECRET);
    const userProfile = await userModel.findById(user.id);
    return userProfile;
  } catch (e) {
    return null;
  }
};

module.exports = {
  getUserFromToken,
  createUserToken,
};
