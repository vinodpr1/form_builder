import express from "express";
import { createForm, readForms, readForm, submitResponse, readResponse } from "../../controllers";
import { authenticator } from "../../middlewares/authenticator";

const fromRouter = express.Router();

fromRouter.post("/forms", authenticator, createForm);
fromRouter.get("/forms", readForms);
fromRouter.get("/form/:id", readForm);
fromRouter.post("/form", submitResponse);
fromRouter.get("/formresponses", readResponse);

export default fromRouter;
