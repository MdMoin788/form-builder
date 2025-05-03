import { Document, Schema, model, Types } from 'mongoose';

export interface IResponse extends Document {
  formId: Types.ObjectId;
  answers: { [key: string]: string };
  email?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResponseSchema = new Schema<IResponse>(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
    answers: { type: Schema.Types.Mixed, required: true },
    email: { type: String },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const ResponseModel = model<IResponse>('Response', ResponseSchema);
