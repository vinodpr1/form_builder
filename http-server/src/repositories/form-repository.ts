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

  async readForms() {
    try {
      const forms = await FormModel.find({});
      return forms;
    } catch (error) {
      console.log("Error has occured while fetching forms");
      throw error;
    }
  }

  async readForm(id: string) {
    try {
      const form = await FormModel.findById(id);
      return form;
    } catch (error) {
      console.log("Error has occured while fetching forms");
      throw error;
    }
  }

}