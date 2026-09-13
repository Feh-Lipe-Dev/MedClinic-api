import { LoginDTO } from '../dtos/LoginDTO'
import { RegistrarUsuarioDTO } from '../dtos/RegistrarUsuarioDTO'
import { Usuario, UsuarioRole } from '../entities/Usuario'
import { ApiError } from '../middlewares/errorHandler'
import { usuarioRepository } from '../repositories/UsuarioRepository'
import { compararSenha, hashSenha } from '../utils/bcrypt'
import { gerarToken } from '../utils/jwt'
import { validarDto } from '../utils/validarDto'

type RegistrarUsuarioPayload = Record<string, unknown>

export class AuthService {
    async registrarUsuario(payload: RegistrarUsuarioPayload): Promise<Usuario> {
        const dto = await validarDto(RegistrarUsuarioDTO, payload)

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

    async login(payload: RegistrarUsuarioPayload): Promise<string> {
        const dto = await validarDto(LoginDTO, payload)

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