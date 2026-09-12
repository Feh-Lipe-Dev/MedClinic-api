import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

const authService = new AuthService()

export class AuthController {
    async cadastrar(req: Request, res: Response) {
        const usuario = await authService.registrarUsuario(req.body)

        return res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
            criadoEm: usuario.criadoEm,
        })
    }

    async login(req: Request, res: Response) {
        const token = await authService.login(req.body)

        return res.status(200).json({ token })
    }
}