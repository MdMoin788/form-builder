import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'
import { httpStatusCodes } from '../constants/httpStatusCodes'
import { CustomError } from '../utils/CustomError'

export const ValidationMiddleware =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body) 
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: any = error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))

        next(
          new CustomError(
            httpStatusCodes.notFound,
            'Validation failed',
            validationErrors
          )
        )
      } else {
        next(error)
      }
    }
  }
