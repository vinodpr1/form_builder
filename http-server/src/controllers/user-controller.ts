import { Request, Response } from "express";
import { UserService } from "../services";

const userService = new UserService();

const createUser = async (req: any, res:any) => {
  try {
    const { email, password, name } = req.body;
    console.log(email);
    const response = await userService.createUser(
      email,
      password,
      name
    );
    return res.status(200).json({
      data: response,
      Message: "User Created Successfully",
      scuccess: true,
    });
  } catch (error) {
    return res.status(400).json({
      Message: "User can not Created Successfully#",
      success: false,
      error: error,
    });
  }
};

const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const response = await userService.authenticateUser(email, password);
    return res.status(200).json({
      data: response,
      Message: "User authenticated successfully",
      scuccess: true,
    });
  } catch (error) {
    return res.status(400).json({
      Message: "User can not login successfully",
      scuccess: false,
      error: error,
    });
  }
};

export {
  createUser,
  loginUser
};
