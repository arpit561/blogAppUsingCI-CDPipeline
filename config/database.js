const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((error) => {
      console.log("Error in Db connection");
      console.log(error);
    });
};

module.exports = connectWithDb;
