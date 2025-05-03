import { Document, Schema, model, Types } from 'mongoose';

export interface IFormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'dropdown' | 'checkbox' | 'rating';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  conditional?: {
    fieldId: string;
    value: string;
  };
}

export interface IForm extends Document {
  userId: Types.ObjectId;
  slug: string;
  title: string;
  fields: IFormField[];
  password?: string;
  status: 'open' | 'closed' | 'scheduled';
  schedule?: {
    open?: Date;
    close?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FormSchema = new Schema<IForm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    fields: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true },
        label: { type: String, required: true },
        placeholder: { type: String },
        required: { type: Boolean },
        options: [{ type: String }],
        conditional: {
          fieldId: { type: String },
          value: { type: String },
        },
      },
    ],
    password: { type: String },
    status: { type: String, enum: ['open', 'closed', 'scheduled'], default: 'open' },
    schedule: {
      open: { type: Date },
      close: { type: Date },
    },
  },
  { timestamps: true, versionKey: false }
);

export const FormModel = model<IForm>('Form', FormSchema);
