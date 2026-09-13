import { Request, Response, NextFunction } from 'express'
import { UsuarioRole } from '../entities/Usuario'
import { ApiError } from './errorHandler'

export function exigeRole(...perfis: UsuarioRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = req.usuario ?? {}

        if (!role) {
            throw new ApiError(401, 'Token não informado.')
        }

        if (!perfis.includes(role)) {
            throw new ApiError(403, 'Acesso negado.')
        }

        next()
    }
}