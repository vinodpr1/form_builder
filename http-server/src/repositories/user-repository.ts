import { User } from "../models";

export class UserRepository {
  constructor() {}

  async createUser(data:any) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email:string) {
    try {
      const user = await User.findOne({ email: email }).select("+password");
      return user;
    } catch (error) {
      console.log("Error has occured while finding user");
      throw error;
    }
  }

}