import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose, { Document, Types } from 'mongoose'
import { httpStatusCodes } from '../constants/httpStatusCodes'
import { IUser, UserModel } from '../models/User'
import { CustomError } from '../utils/CustomError'
import { BaseRepository } from './BaseRepository'

export interface IUserService {
  logout(res: Record<string, any>): Promise<IUser[]>
  registerUser(
    userData: Partial<IUser>
  ): Promise<{ user: IUser; token: string }>
  loginUser(userData: Partial<IUser>): Promise<{ user: IUser; token: string }>
}
export class UserService extends BaseRepository<IUser> implements IUserService {
  constructor () {
    super(UserModel)
  }

  public async logout (res: Record<string, any>): Promise<IUser[]> {
    try {
      res.clearCookie('authToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax' 
      })
      return [] as IUser[]
    } catch (error) {
      throw error
    }
  }

  public async registerUser (
    userData: Partial<IUser>
  ): Promise<{ user: IUser; token: string }> {
    const data = { ...userData }
    try {
      const existingUser = await this.model.findOne({
        email: userData.email as string
      })
      if (existingUser) {
        throw new CustomError(
          httpStatusCodes.conflict,
          'You are already a registered user, please login'
        )
      }

      userData.password = await this.generateHashedPassword(userData.password!)
      await this.create(userData) //as IUser & Document

      const { user, token } = await this.loginUser(data)
      return { user, token }
    } catch (error) {
      throw error
    }
  }


  public async loginUser (
    userData: Partial<IUser>
  ): Promise<{ user: IUser; token: string }> {
    try {
      let user = (await this.model.findOne({
        email: userData.email as string
      })) as IUser & Document
      if (!user) {
        throw new CustomError(
          httpStatusCodes.notFound,
          'You are not a registered user, please register first'
        )
      }

      const isMatch = await this.verifyPassword(
        userData.password as string,
        user.password
      )
      if (!isMatch) {
        throw new CustomError(
          httpStatusCodes.badRequest,
          'Invalid crendential, please provide correct crendential'
        )
      }

      // user without password;
      const userObject = user.toObject()
      delete userObject.password
      // Generate JWT token
      const token = this.generateToken(user._id)
      return { user: userObject, token }
    } catch (error) {
      throw error
    }
  }
  private async verifyPassword (
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
      throw error
    }
  }

  private async generateHashedPassword (password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 5)
    } catch (error) {
      throw error
    }
  }
  private generateToken (userId: unknown): string {
    try {
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: '15d'
      })
      return token
    } catch (error) {
      throw error
    }
  }
 
}
