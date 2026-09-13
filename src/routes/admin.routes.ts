import { Router } from 'express'
import { AdminController } from '../controllers/AdminController'
import { UsuarioRole } from '../entities/Usuario'
import { authMiddleware } from '../middlewares/authMiddleware'
import { exigeRole } from '../middlewares/roleMiddleware'

const adminRoutes = Router()
const adminController = new AdminController()

adminRoutes.get(
    '/ping',
    authMiddleware,
    exigeRole(UsuarioRole.ADMIN),
    (req, res) => adminController.ping(req, res)
)

export { adminRoutes }