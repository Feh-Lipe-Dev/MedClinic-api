import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post('/register', (req, res) => authController.cadastrar(req, res))

authRoutes.post('/login', (req, res) => authController.login(req, res))

export { authRoutes }