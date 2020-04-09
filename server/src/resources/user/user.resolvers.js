const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");

const currentUser = (parent, args, ctx, info) => {
  return ctx.user;
};

const updateCurrentUser = async (parent, args, ctx, info) => {
  const updatedUser = await ctx.models.User.findByIdAndUpdate(
    ctx.user.id,
    args.input,
    {
      new: true,
    }
  );
  return updatedUser;
};

const deleteCurrentUser = async (_, args, ctx) => {
  const deletedUser = await ctx.models.User.findByIdAndRemove(
    ctx.user.id
  ).exec();
  return deletedUser;
};

const users = async (_, __, ctx) => {
  const users = await ctx.models.User.find({}).exec();
  return users;
};

const user = async (_, args, ctx) => {
  const user = await ctx.models.User.findById(args.id).exec();
  return user;
};

const adminCreateUser = async (_, args, ctx) => {
  const newUser = await ctx.models.User.create(args.input);
  return newUser;
};

const adminUpdateUser = async (_, args, ctx) => {
  const updatedUser = await ctx.models.User.findByIdAndUpdate(
    args.input.id,
    args.input,
    {
      new: true,
    }
  );
  return updatedUser;
};

const adminDeleteUser = async (_, args, ctx) => {
  const deletedUser = await ctx.models.User.findByIdAndRemove(args.id).exec();
  return deletedUser;
};

const signup = async (_, args, ctx) => {
  const existingUser = await ctx.models.User.findOne({
    email: args.input.email,
  });
  if (existingUser) {
    throw new AuthenticationError("User already exists, sign in instead");
  }
  const user = await ctx.models.User.create(args.input);
  const token = ctx.createUserToken(user);
  return { user, token };
};

const login = async (_, args, ctx) => {
  const user = await ctx.models.User.findOne({
    email: args.input.email,
  });
  if (!user) {
    throw new AuthenticationError("Wrong email and password combination");
  }
  try {
    const isPasswordMatch = await bcrypt.compare(
      args.input.password,
      user.password
    );
    if (!isPasswordMatch) {
      throw new AuthenticationError("Wrong email and password combination");
    }
    const token = ctx.createUserToken(user);
    return { user, token };
  } catch (e) {
    throw new AuthenticationError("Wrong email and password combination");
  }
};

module.exports = {
  Query: {
    currentUser,
    user,
    users,
  },
  Mutation: {
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser,
    signup,
    login,
    updateCurrentUser,
    deleteCurrentUser,
  },
  User: {
    things: (root, args, ctx) => {
      return ctx.models.Thing.find({ owner: root.id });
    },
  },
};
