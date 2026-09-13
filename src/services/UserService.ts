import { Usuario } from '../entities/Usuario'
import { ApiError } from '../middlewares/errorHandler'
import { usuarioRepository } from '../repositories/UsuarioRepository'

export class UserService {
    async mostrarPerfil(id: string): Promise<Usuario> {
        const usuario = await usuarioRepository.findOneBy({ id })

        if (!usuario) {
            throw new ApiError(404, 'Usuário não encontrado.')
        }

        return usuario
    }
}