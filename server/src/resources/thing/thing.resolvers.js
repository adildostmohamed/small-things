const { AuthenticationError } = require("apollo-server");

const getUserThings = async (parent, args, ctx, info) => {
  const userThings = await ctx.models.Thing.find({
    owner: ctx.user.id,
  }).exec();
  return userThings;
};

const getUserThing = async (parent, args, ctx, info) => {
  const userThing = await ctx.models.Thing.findById(args.id);
  if (userThing.owner !== ctx.user.id) {
    throw new AuthenticationError(
      "Requested thing does not belong to current user"
    );
  }
  return userThing;
};

const createThing = async (parent, args, ctx, info) => {
  const newThingData = { ...args.input, owner: ctx.user.id };
  const newThing = await ctx.models.Thing.create(newThingData);
  return newThing;
};

const updateThing = async (parent, args, ctx, info) => {
  const updatedThing = await ctx.models.Thing.findByIdAndUpdate(
    args.input.id,
    args.input,
    {
      new: true,
    }
  );
};

const deleteThing = async (parent, args, ctx, info) => {
  const deletedThing = await ctx.models.Thing.findByIdAndRemove(args.id).exec();
  return deletedThing;
};

module.exports = {
  Query: {
    getUserThings,
    getUserThing,
  },
  Mutation: {
    createThing,
    updateThing,
    deleteThing,
  },
  Thing: {
    owner: async (root, args, ctx, info) => {
      const user = await ctx.models.User.findById(root.owner);
      return user;
    },
  },
};
