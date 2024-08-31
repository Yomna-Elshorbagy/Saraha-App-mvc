import express from "express";
import session from "express-session";
import cors from "cors"
import MongoSession from "connect-mongodb-session";
import { connectionDb } from "./database/dbConnection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import messageRouter from "./src/modules/messages/messages.router.js";
import userRouter from "./src/modules/user/user.router.js";
import { globalError } from "./src/utils/catchError.js";

const MongoDBStore = MongoSession(session);
const app = express();
const port =process.env.PORT || 3000;
connectionDb();
app.use(cors());

const store = new MongoDBStore({
  uri: process.env.MONGODB_ATLAS,
  collection: "mySessions",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);
app.use("*", (req, res, next) => {
  next(new AppError(`Route Not Found ${req.originalUrl}`, 404));
});
app.use(globalError);

app.listen(port, () => console.log("server is running on port ", port));
