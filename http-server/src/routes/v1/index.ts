import express from "express";
import userRouter from "./users";
import fromRouter from "./formbuilder";

const router = express.Router();

router.use("/user", userRouter);
router.use("/form", fromRouter);

export default router;
