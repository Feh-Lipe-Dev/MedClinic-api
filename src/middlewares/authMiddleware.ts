import { Request, Response, NextFunction } from 'express'
import { verificarToken } from '../utils/jwt'
import { ApiError } from './errorHandler'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization

    if (!header) {
        throw new ApiError(401, 'Token não informado.')
    }

    const [tipo, token] = header.split(' ')

    if (tipo !== 'Bearer' || !token) {
        throw new ApiError(401, 'Token não informado.')
    }

    try {
        const payload = verificarToken(token)
        req.usuario = payload
        next()
    } catch {
        throw new ApiError(401, 'Token inválido ou expirado.')
    }
}