import jwt from 'jsonwebtoken'
import { UsuarioRole } from '../entities/Usuario'

export interface TokenPayload {
    id: string
    role: UsuarioRole
}

const SECRET = process.env.JWT_SECRET
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn']

export function gerarToken(payload: TokenPayload): string {
    if (!SECRET) {
        throw new Error('JWT_SECRET não configurado.')
    }

    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

export function verificarToken(token: string): TokenPayload {
    if (!SECRET) {
        throw new Error('JWT_SECRET não configurado.')
    }

    return jwt.verify(token, SECRET) as TokenPayload
}