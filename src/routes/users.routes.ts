import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const usersRoutes = Router()
const userController = new UserController()

usersRoutes.get('/me', authMiddleware, (req, res) =>
    userController.mostrarPerfil(req, res)
)

export { usersRoutes }