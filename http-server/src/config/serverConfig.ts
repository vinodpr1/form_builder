import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export {
  PORT,
  MONGO_URL,
  JWT_SECRET
};
