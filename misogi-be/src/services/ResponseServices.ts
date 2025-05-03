import { BaseRepository } from './BaseRepository'
import { IResponse, ResponseModel } from '../models/Responses'
import { CustomError } from '../utils/CustomError'
import { FormServices, IFormServices } from './FormServices'

export interface IResponseServices {
  getResponses(formId: string): Promise<IResponse[]>
  saveResponse(body: any): Promise<IResponse>
}

export class ResponseServices
  extends BaseRepository<IResponse>
  implements IResponseServices
{
  private formService: IFormServices
  constructor () {
    super(ResponseModel)
    this.formService = new FormServices()
  }

  public async saveResponse (body: any): Promise<IResponse> {
    const form = await this.formService.getFormBySlug(body?.formSlug)
    if (!form) throw new CustomError(404, 'Form not found')

    const response = await ResponseModel.create({
      ...body,
      formId: form?._id
    })

    return response
  }

  public async getResponses (formId: string): Promise<IResponse[]> {
    const formResponse = await ResponseModel.find({ formId: formId })
    if (!formResponse) throw new CustomError(404, 'Form not found')
    return formResponse
  }
}
