import express from "express";
import { createForm, readForms } from "../../controllers";

const fromRouter = express.Router();

fromRouter.post("/forms", createForm);
fromRouter.get("/forms", readForms);

export default fromRouter;
