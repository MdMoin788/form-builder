import { BaseRepository } from './BaseRepository'
import { IResponse, ResponseModel } from '../models/Responses'
import { CustomError } from '../utils/CustomError'

export interface IResponseServices {
  getResponses(userId: string): Promise<IResponse[]>
  saveResponse(userId: string, answers: any, email: string): Promise<IResponse>
}

export class ResponseServices
  extends BaseRepository<IResponse>
  implements IResponseServices
{
  constructor () {
    super(ResponseModel)
  }

  public async saveResponse (formSlug: string, answers: any, email?: string) {
    const form = await this.findOne({ slug: formSlug })
    if (!form) throw new CustomError(404, 'Form not found')

    const response = await ResponseModel.create({
      formId: form._id,
      answers,
      email
    })

    return response
  }

  public async getResponses (formSlug: string) {
    const form = await this.findOne({ slug: formSlug })
    if (!form) throw new CustomError(404, 'Form not found')

    return await ResponseModel.find({ formId: form._id })
  }
}
