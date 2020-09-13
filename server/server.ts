const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bodyParser = require("body-parser");

// INIT APP
const app = express();

// INIT DB
mongoose.connect(require("./config/keys").MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbConnection = mongoose.connection;
dbConnection.on("error", (err: Error) => console.log(err));
dbConnection.once("open", () => console.log("DB Connected..."));

// PASSPORT MIDDLEWARE
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// APP CONFIG
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: dbConnection }),
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

// PORT
const PORT = process.env.PORT || 3000;

// START SERVER
app.listen(PORT, () => console.log(PORT));
