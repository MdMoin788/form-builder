import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserDTO } from '../dtos/UserDTO'
import { ValidationMiddleware } from '../middlewares/ValidationMiddleware'

export class UserRoutes {
  router: Router
  private userController: UserController
  constructor () {
    this.router = Router()
    this.userController = new UserController()
    this.initializeRoutes()
  }
  private initializeRoutes () {
    this.router.post(
      '/createUser',
      ValidationMiddleware(UserDTO),
      this.userController.registerUser
    )
    this.router.post(
      '/login',
      ValidationMiddleware(UserDTO.pick({ email: true, password: true })),
      this.userController.loginUser
    )
    this.router.get('/logout', this.userController.logout)
  }
}
