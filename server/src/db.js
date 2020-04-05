const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = connectDB;
