import { Request, Response } from "express";
import { FormModel } from "../models";
import { FormService } from "../services";

const formService = new FormService();
const createForm = async (req: any, res:any) => {
  try {
    const formdata = req.body; 
    const userid =  req.user.id;
    formdata.userid=userid;
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
      const response = await formService.readForms();
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


  const readForm = async (req: any, res:any) => {
    try {
      const form = await formService.readForm(req.params.id);
      if (!form) return res.status(404).send({Message: "error occured while getting from by form id",});
      return res.status(200).json({
        response: form,
        Message: "from by form id",
        scuccess: true,
      });
    } catch (error) {
      return res.status(400).json({
        Message: "error occured while getting from by form id",
        success: false,
        error: error,
      });
    }
  };

  const submitResponse = async (req: any, res:any) => {
    try {
      const data = req.body;
      const submission = await formService.submitResponse(req.headers.formid, data);
      return res.status(200).json({
        response: submission,
        Message: "from by form id",
        scuccess: true,
      });
    } catch (error) {
      return res.status(400).json({
        Message: "error occured while getting from by form id",
        success: false,
        error: error,
      });
    }
  };

  const readResponse = async (req: any, res:any) => {
    try {
      const responses = await formService.readResponse(req.headers.formid);
      return res.status(200).json({
        responses: responses,
        Message: "from by form id",
        scuccess: true,
      });
    } catch (error) {
      return res.status(400).json({
        Message: "error kjweiu398384 occured while getting from by form id",
        success: false,
        error: error,
      });
    }
  };


export {
  createForm,
  readForms,
  readForm,
  submitResponse,
  readResponse
};
