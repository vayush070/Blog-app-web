const mongoose = require("mongoose");
const config = require("config");
const db_url = config.get("mongo_url");

const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
    });
    console.log("MONGO Connected.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
