import { UserRepository } from "../repositories";

const userRepository = new UserRepository();
export class UserService {
    constructor() {}
  
    async createUser(email: string, password: string, name: string) {
      try {
        const userData = { email, password, name };
        const user = await userRepository.createUser(userData);
        const token = user.genJWT();
        user.verifyToken(token);
        return { user, token };
      } catch (error) {
        console.log("Error", error);
      }
    }

    async authenticateUser(email: string, password: string) {
        try {
          // checking a user is present in db or not
          const res = await this.getByEmail(email);
          if (!res) {
            const clientError = {
             message: "Please check your Email id , we have't this email in our record",
            };
            throw clientError;
          }
    
          // is user is preset then will check for
          if (!res.comparePassword(password)) {
            const clientError = {
              message: "Please check your Password , we have't this pass associated with any Email",
            };
            throw clientError;
          }
    
          const token = res.genJWT();
          res.verifyToken(token);
    
          const user = {
            _id: res._id,
            email: res.email,
            name: res.name,
          };
    
          return { user, token };
        } catch (error) {
          throw error;
        }
    }
    
    async getByEmail(email: string) {
        try {
          const response = await userRepository.getByEmail(email);
          return response;
        } catch (error) {
          console.log("Error has  occured while getting user via email");
          throw { error };
        }
    }
}