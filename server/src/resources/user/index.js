const fs = require("fs");
const path = require("path");

const userModel = require("./user.model");
const userResolvers = require("./user.resolvers");
const userTypeDefs = fs.readFileSync(
  path.join(__dirname, "./", "user.graphql"),
  "utf-8"
);

module.exports = {
  model: userModel,
  resolvers: userResolvers,
  typeDefs: userTypeDefs,
};
