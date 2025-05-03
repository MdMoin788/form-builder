import { BaseRepository } from './BaseRepository'
import { FormModel, IForm } from '../models/Form'
import { CustomError } from '../utils/CustomError'

export interface IFormServices {
  createForm(data: Partial<IForm>): Promise<IForm>
  getAllFormsByUser(userId: string): Promise<IForm[]>
  getFormBySlug(slug: string): Promise<IForm | null>
  getAllForm(): Promise<IForm[] | null>
}

export class FormServices extends BaseRepository<IForm> implements IFormServices {
  constructor () {
    super(FormModel)
  }

  public async createForm(data: any) {
    const form = await this.create(data);
    return form;
  }

  public async getFormBySlug(slug: string) {
    const form = await this.findOne({ slug });
    if (!form) throw new CustomError(404, "Form not found");
    return form;
  }

  public async getAllFormsByUser(userId: string) {
    return await FormModel.find({ userId });
  }
  public async getAllForm() {
    return await FormModel.find();
  }
}
