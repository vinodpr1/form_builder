import { FormModel, UserResponse } from "../models";


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

  async submitResponse(id: string, data: any) {
    try {
      console.log("kkkkkkkkkkkk", id, data);
      const response = await UserResponse.create({
        formId: id,
        responses: data
      });
      return response;
    } catch (error) {
      console.log("Error has occured while fetching forms");
      throw error;
    }
  }


  
  async readResponse(formId: string) {
    try {
      const responses = await UserResponse.find({ formId: formId })
        .sort({ createdAt: -1 })
        .lean();
      return responses;
    } catch (error) {
      console.error("Error occurred while fetching responses:", error);
      throw new Error('Failed to fetch responses')
    }
  }

}