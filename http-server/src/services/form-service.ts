import { FormRepository } from "../repositories";

const formRepository = new FormRepository();
export class FormService {
    constructor() {}
  
    async createForm(data: any) {
      try {
        const response = await formRepository.createForm(data);
        return response;
      } catch (error) {
        console.log("Error", error);
      }
    }

    async readForm() {
        try {
          const response = await formRepository.readForm();
          return response;
        } catch (error) {
          console.log("Error", error);
        }
    }

}