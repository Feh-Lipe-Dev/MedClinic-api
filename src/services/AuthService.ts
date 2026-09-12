import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { LoginDTO } from '../dtos/LoginDTO'
import { RegistrarUsuarioDTO } from '../dtos/RegistrarUsuarioDTO'
import { Usuario, UsuarioRole } from '../entities/Usuario'
import { ApiError } from '../middlewares/errorHandler'
import { usuarioRepository } from '../repositories/UsuarioRepository'
import { compararSenha, hashSenha } from '../utils/bcrypt'
import { gerarToken } from '../utils/jwt'

type RegistrarUsuarioPayload = Record<string, unknown>

export class AuthService {
    async registrarUsuario(payload: RegistrarUsuarioPayload): Promise<Usuario> {
        const dto = plainToInstance(RegistrarUsuarioDTO, payload)
        const erros = await validate(dto)

        if (erros.length > 0) {
            const mensagens = erros.flatMap((erro) =>
                Object.values(erro.constraints ?? {})
            )
            throw new ApiError(400, mensagens.join('; '))
        }

        const emailExistente = await usuarioRepository.findOneBy({ email: dto.email })

        if (emailExistente) {
            throw new ApiError(409, 'E-mail já cadastrado.')
        }

        const senhaHash = await hashSenha(dto.senha)

        const usuario = usuarioRepository.create({
            nome: dto.nome,
            email: dto.email,
            senha: senhaHash,
            role: dto.role ?? UsuarioRole.ATENDENTE,
        })

        return usuarioRepository.save(usuario)
    }

    async login(payload: LoginDTO): Promise<string> {
        const dto = plainToInstance(LoginDTO, payload)
        const erros = await validate(dto)

        if (erros.length > 0) {
            const mensagens = erros.flatMap((erro) =>
                Object.values(erro.constraints ?? {})
            )
            throw new ApiError(400, mensagens.join('; '))
        }

        const usuario = await usuarioRepository.findOneBy({ email: dto.email })

        if (!usuario) {
            throw new ApiError(401, 'Credenciais inválidas.')
        }

        const senhaValida = await compararSenha(dto.senha, usuario.senha)

        if (!senhaValida) {
            throw new ApiError(401, 'Credenciais inválidas.')
        }

        return gerarToken({ id: usuario.id, role: usuario.role })
    }
}