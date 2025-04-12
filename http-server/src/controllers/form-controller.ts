import { Request, Response } from "express";
import { FormModel } from "../models";
import { FormService } from "../services";

const formService = new FormService();
const createForm = async (req: any, res:any) => {
  try {
    const formdata = req.body; 
    console.log("kontroller", formdata);
    const response = await formService.createForm(formdata);
    return res.status(200).json({
      response: response,
      Message: "form endpoint to create froms dlsmd sdlskd sdlksdls,d",
      scuccess: true,
    });
  } catch (error) {
    return res.status(400).json({
      Message: "error occured at form endpoint",
      success: false,
      error: error,
    });
  }
};

const readForms = async (req: any, res:any) => {
    try {
      const response = await formService.readForm();
      return res.status(200).json({
        response: response,
        Message: "read endpoint to get all froms test endpoint",
        scuccess: true,
      });
    } catch (error) {
      return res.status(400).json({
        Message: "error occured at form endpoint failing",
        success: false,
        error: error,
      });
    }
  };

export {
  createForm,
  readForms
};
