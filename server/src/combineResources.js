const merge = require("lodash.merge");
// import app resouces to construct gql server
const user = require("./resources/user");
const thing = require("./resources/thing");

// construct typedefs from resources
const typeDefs = [user.typeDefs, thing.typeDefs].join(" ");

// combine resolvers from all resources
const resolvers = merge(user.resolvers, thing.resolvers);

// combine models from all resources
const models = {
  User: user.model,
  Thing: thing.model,
};

module.exports = {
  typeDefs,
  resolvers,
  models,
};
