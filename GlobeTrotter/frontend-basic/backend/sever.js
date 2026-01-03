const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/trips", require("./routes/trips"));

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
