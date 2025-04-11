import express from "express";
import bodyParser from "body-parser";
import createDBConnection from "./config/dbConnection";
import { PORT } from "./config/serverConfig";
import router from "./routes";
import cors from "cors";

const startServer = () => {
  const app = express();

  app.use(cors())

  app.listen(PORT, async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", router);
    
    await createDBConnection();
    console.log(`Server has Started on PORT No ${PORT}`);
  });
};

startServer();
