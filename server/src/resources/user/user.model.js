const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltingRounds = 10;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "User must have a last name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User must have an email"],
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
    },
    role: {
      type: String,
      required: [true, "User must have a role"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  // dont modify the password for existing users
  if (!user.isModified || !user.isNew) {
    return next();
  } else {
    bcrypt.hash(user.password, saltingRounds, (err, hash) => {
      if (err) {
        next(err);
        throw new Error(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
