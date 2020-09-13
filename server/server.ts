import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const MongoStore = connectMongo(session);

// INIT APP
const app = express();

// INIT DB
mongoose.connect(require("./config/keys").MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(err));
dbConnection.once("open", () => console.log("DB Connected..."));

// PASSPORT MIDDLEWARE

// PORT
const PORT = process.env.PORT || 3000;

// START SERVER
app.listen(PORT, () => console.log(PORT));
