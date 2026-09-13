import { Request, Response } from 'express'
import { ApiError } from '../middlewares/errorHandler'
import { UserService } from '../services/UserService'

const userService = new UserService()

export class UserController {
    async mostrarPerfil(req: Request, res: Response) {
        const id = req.usuario?.id

        if (!id) {
            throw new ApiError(401, 'Token não informado.')
        }

        const usuario = await userService.mostrarPerfil(id)

        return res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
            criadoEm: usuario.criadoEm,
        })
    }
}