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

    async readForms() {
        try {
          const response = await formRepository.readForms();
          return response;
        } catch (error) {
          console.log("Error", error);
        }
    }

    async readForm(id: string) {
        try {
          const response = await formRepository.readForm(id);
          return response;
        } catch (error) {
          console.log("Error", error);
        }
    }

    async submitResponse(id: string, data: any) {
      try {
        const response = await formRepository.submitResponse(id, data);
        return response;
      } catch (error) {
        console.log("Error", error);
      }
  }

}