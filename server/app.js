const express = require("express");
require("./db/dbConnection");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/", userRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(8000, () => {
  console.log("server running");
});
