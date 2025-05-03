import { Request, Response, NextFunction } from 'express'
import { cookieOptions } from '../constants/cookieOption'
import { httpStatusCodes } from '../constants/httpStatusCodes'
import { IUserService, UserService } from '../services/UserService'
import { sendResponse } from '../utils/sendResponse'
import { IUser } from '../models/User'
export interface AuthenticatedRequest extends Request {
  user?: IUser
}
export class UserController {
  private userService: IUserService

  constructor () {
    this.userService = new UserService()
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.logout(res)
      sendResponse(
        res,
        httpStatusCodes.ok,
        users,
        "User has logout successfully"
      )
    } catch (error) {
      next(error) 
    }
  }

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user, token } = await this.userService.registerUser(req.body)
      res.cookie('token', token, cookieOptions)
      sendResponse(res, httpStatusCodes.created, user, '', { token })
    } catch (error) {
      next(error)
    }
  }

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user, token } = await this.userService.loginUser(req.body)
      // Set token in HTTP-only cookie
      res.cookie('token', token, cookieOptions)
      sendResponse(res, httpStatusCodes.ok, user, '', { token })
    } catch (error) {
      next(error)
    }
  }
}
