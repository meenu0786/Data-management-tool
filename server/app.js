const express = require("express");

const app = express();

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(8000, () => {
  console.log("server running");
});
