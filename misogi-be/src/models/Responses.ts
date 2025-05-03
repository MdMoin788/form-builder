

import { Document, Schema, model, Types } from 'mongoose';

export interface IResponse extends Document {
  formId?: Types.ObjectId; 
  formSlug: string; 
  answers: Map<string, string>; 
  email?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResponseSchema = new Schema<IResponse>(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form' }, 
    formSlug: { type: String, required: true }, 
    answers: {
      type: Map,
      of: String,
      required: true,
    },
    email: { type: String },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const ResponseModel = model<IResponse>('Response', ResponseSchema);
