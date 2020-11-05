import express from "express";
import passport from "passport";

const center = express.Router();
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
};

center.get("/", (req, res) => {
  res.render("success");
});

center.get("/fail", (req, res) => {
  res.render("fail");
});

center.get("/login", (req, res) => {
  res.render("login");
});

center.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

center.get("/list", isAuthenticated, (req, res) => {
  console.log(req);
  console.log(req.user);
  res.send(req.user);
});

export default center;
