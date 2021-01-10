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
const { rtd } = require("./utilities/firebase/admin_config");
const { UserModal } = require("./modals");

const io = require("./utilities/socketio").init(server);

//################################################################################################################################# initializing socket.io
io.on("connection", (socket) => {
  const user = JSON.parse(socket.handshake.headers.user);
  // ========================= runs when a user connects =========================
  if (user) {
    UserModal.updateOne(
      { _id: user.id },
      { online: true },
      function (err, user2) {
        console.log(`user with id:${user.id} is now online`);
      }
    );
  } else {
    console.log("an unknown user connected");
  }
  // ========================= runs when a user disconnects =========================
  socket.on("disconnect", (data) => {
    if (user) {
      UserModal.updateOne(
        { _id: user.id },
        { online: false },
        function (err, user2) {
          console.log(`user with id:${user.id} is now offline`);
        }
      );
    } else {
      console.log("an unknown user disconnected");
    }
  });
  // ============================================ listening to user locations

  socket.on("location", (data) => {
    //=========================================================  fetching all mechanics' locations from firestore
    rtd.ref("/user_locations/" + data.id).set(
      {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      (error) => {
        if (error) {
          console.log(`The write failed because of error ${error}`);
        }
      }
    );
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
