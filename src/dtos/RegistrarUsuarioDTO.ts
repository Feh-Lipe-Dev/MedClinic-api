import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator'
import { UsuarioRole } from '../entities/Usuario'

export class RegistrarUsuarioDTO {
    @IsNotEmpty({ message: 'nome é obrigatório.' })
    @Length(3, 50, { message: 'nome deve ter entre 3 e 50 caracteres.' })
    nome!: string

    @IsNotEmpty({ message: 'e-mail é obrigatório.' })
    @IsEmail({}, { message: 'e-mail em formato inválido.' })
    email!: string

    @IsNotEmpty({ message: 'senha é obrigatória.' })
    @Length(6, 72, { message: 'senha deve ter entre 6 e 72 caracteres.' })
    senha!: string

    @IsOptional()
    @IsEnum(UsuarioRole, { message: 'role deve ser ATENDENTE ou ADMIN.' })
    role?: UsuarioRole
}