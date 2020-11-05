import express from "express";
import session from "express-session";
import cookiePaser from "cookie-parser";
import bodyPaser from "body-parser";
import morgan from "morgan";
import passport from "passport";

import passportConfig from "./passport";
import authRouter from "./routes/authRouter";
import center from "./routes/center";

const app = express();
const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: "test",
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

app.set("view engine", "pug");
app.use(cookiePaser());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(sessionOptions));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", center);
app.use("/auth", authRouter);

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).send("NOT FOUND");
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});
export default app;
