const { sequelize } = require("../models");

const connectDB = async () => {
  try {
    console.log("Authenticating");
    await sequelize.sync({ logging: false });
    console.log("Successfully authenticated");
  } catch (error) {
    console.log("Error connecting DB" + error);
  }
};

module.exports = connectDB;
