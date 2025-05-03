import { Document, Model } from "mongoose";

export interface IBaseRepository<T extends Document> {
  getAll(query: Record<string, any>): Promise<T[]>;
  findOne(query?: Record<string, any>): Promise<T[]>;

  getById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

export abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // Get all documents
  protected async getAll(query: Record<string, any> = {}): Promise<T[]> {
    return await this.model.find(query).exec();
  }

  // Get a document by ID
  protected async getById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  // Get a document by ID
  protected async findOne(query: Record<string, any> = {}): Promise<T | null> {
    return await this.model.findOne(query).exec();
  }

  // Create a new document
  protected async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  // Update an existing document
  protected async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete a document
  protected async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
