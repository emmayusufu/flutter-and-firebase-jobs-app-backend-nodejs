require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const port = process.env.PORT;

const sq = require("./utilities/db-config");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

// =============================importing routes
const userRoutes = require("./routes/userRoutes");

// ============================using the imported routes
app.use(userRoutes);

(async () => {
  try {
    await sq.sync();
    server.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
