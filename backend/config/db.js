// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//   });

//   console.log("MongoDB connected");
// };

// module.exports = connectDB;

// const Pool = require('pg').Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "example",
//   host: "localhost",
//   port: 5432,
//   database: "nodejs"
// })

// module.exports = pool;

const { sequelize } = require("../models");

const connectDB = async () => {
  try {
    console.log("Authenticating");
    await sequelize.sync();
    console.log("Successfully authenticated");
  } catch (error) {
    console.log("Error connecting DB" + error);
  }
};

module.exports = connectDB;
