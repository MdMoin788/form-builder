import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '../utils/sendResponse'
import { FormServices, IFormServices } from '../services/FormServices'

export class FormController {
  formService: IFormServices

  constructor () {
    this.formService = new FormServices()
  }
  public createForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const form = await this.formService.createForm(req.body);
      sendResponse(res, 200, form);
    } catch (err) {
      next(err);
    }
  };

  public getFormBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const form = await this.formService.getFormBySlug(req.params.slug);
      sendResponse(res, 200, form);
    } catch (err) {
      next(err);
    }
  };

  public getAllForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const form = await this.formService.getAllForm();
      sendResponse(res, 200, form);
    } catch (err) {
      next(err);
    }
  };

  public getUserForms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forms = await this.formService.getAllFormsByUser(req.params.userId);
      sendResponse(res, 200, forms);
    } catch (err) {
      next(err);
    }
  };

  public getFormById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forms = await this.formService.getFormById(req.params.formId);
      sendResponse(res, 200, forms);
    } catch (err) {
      next(err);
    }
  };
 
}
