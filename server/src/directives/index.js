const AuthorizationDirective = require("./authorization");
const AuthenticationDirective = require("./authentication");

const schemaDirectives = {
  authorization: AuthorizationDirective,
  authentication: AuthenticationDirective,
};

module.exports = schemaDirectives;
