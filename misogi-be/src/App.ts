import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import Database from './config/Database'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import { UserRoutes } from './routes/UserRoutes'
import { FormRoutes } from './routes/FormRoutes'
import { ResponseRoutes } from './routes/ResponseRoutes'

dotenv.config()
class App {
  public app: express.Application
  private formRoutes: FormRoutes
  private responseRoutes: ResponseRoutes
  private userRoutes: UserRoutes
  constructor () {
 
    this.app = express()
 
    this.config()

    this.connectDatabase()
  
    this.formRoutes = new FormRoutes()
    this.responseRoutes = new ResponseRoutes()
    this.userRoutes = new UserRoutes()

    this.routes()

    this.handleErrors()
  }

  private config (): void {
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.json())

  }
  private connectDatabase (): void {
    console.log('Connecting to database...')
    Database.connect()
  }
  

  private routes (): void {

    this.app.use('/api/v1/forms', this.formRoutes.router)
    this.app.use('/api/v1/responses', this.responseRoutes.router)
    this.app.use('/api/v1/users', this.userRoutes.router)
  }

  private handleErrors (): void {
    this.app.use(globalErrorHandler) 
  }
}

export default new App().app


