import express from "express";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send({
    message: "hi",
  });
});

export default authRouter;
