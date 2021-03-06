require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const { protect } = require("./middleware/auth");

connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use(protect);
app.use("/api/private", require("./routes/private"));
app.use("/api/proveedor", require("./routes/proveedor"));
app.use("/api/insumo", require("./routes/insumo"));
app.use("/api/cosecha", require("./routes/cosecha"));
app.use("/api/lote", require("./routes/lote"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`up and running on ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Logged error ${reason}`);

  server.close(() => process.exit(1));
});
