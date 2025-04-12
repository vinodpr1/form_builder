import { FormModel } from "../models";

export class FormRepository {
  constructor() {}

  async createForm(data:any) {
    try {
      const response = await FormModel.create(data);
      return response;
    } catch (error) {
      console.log("Error has occured while creating form");
      throw error;
    }
  }

  async readForm() {
    try {
      const forms = await FormModel.find({});
      return forms;
    } catch (error) {
      console.log("Error has occured while fetching forms");
      throw error;
    }
  }

}