import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authMiddleware } from '../middlewares/authMiddleware'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post('/register', (req, res) => authController.cadastrar(req, res))

authRoutes.post('/login', (req, res) => authController.login(req, res))

authRoutes.get('/teste-protegido', authMiddleware, (req, res) => {
    return res.status(200).json({
        mensagem: 'Acesso autorizado.',
        usuario: req.usuario,
    })
})

export { authRoutes }