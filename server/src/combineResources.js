// import app resouces to construct gql server
const user = require("./resources/user");

// construct typedefs from resources
const typeDefs = [user.typeDefs].join(" ");

// combine resolvers from all resources
const resolvers = Object.assign({}, user.resolvers);

// combine models from all resources
const models = {
  User: user.model,
};

module.exports = {
  typeDefs,
  resolvers,
  models,
};
