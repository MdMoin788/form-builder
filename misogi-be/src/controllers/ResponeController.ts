import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '../utils/sendResponse'
import { IResponseServices, ResponseServices } from '../services/ResponseServices'

export class ResponeController {
  responseService: IResponseServices

  constructor () {
    this.responseService = new ResponseServices()
  }

  public saveResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.responseService.saveResponse(req.body);
      sendResponse(res, 200, response);
    } catch (err) {
      next(err);
    }
  };

  public getResponses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responses = await this.responseService.getResponses(req.params.formId);
      sendResponse(res, 200, responses);
    } catch (err) {
      next(err);
    }
  };

 
 
}
