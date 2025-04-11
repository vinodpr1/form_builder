import express from "express";
import apiRoutes from "./v1/index"

const router = express.Router();

router.use("/v1", apiRoutes);

export default router;
