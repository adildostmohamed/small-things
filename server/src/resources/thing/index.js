const fs = require("fs");
const path = require("path");
const thingModel = require("./thing.model");
const thingResolvers = require("./thing.resolvers");
const thingTypeDefs = fs.readFileSync(
  path.join(__dirname, "./", "thing.graphql"),
  "utf-8"
);

module.exports = {
  model: thingModel,
  resolvers: thingResolvers,
  typeDefs: thingTypeDefs,
};
