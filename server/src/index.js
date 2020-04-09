if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("apollo-server");
const connectDB = require("./db");
const { getUserFromToken, createUserToken } = require("./auth");
const { typeDefs, resolvers, models } = require("./combineResources");
const schemaDirectives = require("./directives");

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;
    const user = await getUserFromToken(authHeader);
    return { models, user, createUserToken };
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
