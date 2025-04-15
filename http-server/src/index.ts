import express from "express";
import bodyParser from "body-parser";
import createDBConnection from "./config/dbConnection";
import { PORT } from "./config/serverConfig";
import router from "./routes";
import cors from "cors";

const startServer = () => {
  const app = express();
  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", router);

  app.listen(PORT, async () => {
    await createDBConnection();
    console.log(`Server has Started on PORT No ${PORT}`);
  });
};

startServer();
