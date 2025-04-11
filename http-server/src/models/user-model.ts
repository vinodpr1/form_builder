import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig";

interface IUser {
  email: string;
  password: string;
  name: string;
  comparePassword(password: string): boolean;
  genJWT(): string;
  verifyToken(token: string): any;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = function compare(password:string) {
  const response = bcrypt.compareSync(password, this.password);
  return response;
};

userSchema.methods.genJWT = function genJwt() {
  return jwt.sign({ id: this.id, email: this.email }, JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

userSchema.methods.verifyToken = function verify(token: string) {
  const response = jwt.verify(token, JWT_SECRET as string);
  return response;
};

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(10);
  const encryptedPass = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedPass;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
