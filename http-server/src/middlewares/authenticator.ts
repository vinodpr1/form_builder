import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig";

export const authenticator=(req:any, res:any, next:any)=>{
  const token = req.header('token');
  console.log("validating");
  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }
  if(!JWT_SECRET) return res.status(401).send({ error: 'token is important' });;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
}