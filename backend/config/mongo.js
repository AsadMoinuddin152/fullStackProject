const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log("✅ Connected to CosmosDB MongoDB using Mongoose!");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectToMongoDb;
