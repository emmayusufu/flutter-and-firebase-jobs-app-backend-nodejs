require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// =============================importing routes
const userRoutes = require("./routes/userRoutes");

const io = require("./utilities/socketio").init(server);

//################################################################################################################################# initializing socket.io
io.on("connection", (socket) => {
  const user = JSON.parse(socket.handshake.headers.user);
  // ========================= runs when a user connects =========================
  if (user) {
    console.log("a user connected");
  } else {
    console.log("an unknown user connected");
  }
  // ========================= runs when a user disconnects =========================
  socket.on("disconnect", (data) => {
    if (user) {
      console.log("a user disconnected");
    } else {
      console.log("an unknown user disconnected");
    }
  });
});

// ============================using the imported routes
app.use(userRoutes);
app.get("/", (req, res) => {
  res.send("Home");
});

mongoose
  .connect(
    "mongodb+srv://emmajoe:240063@workman.vxspb.mongodb.net/workman?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(`caught error: ${e} when connecting to mongodb sever`);
  });
