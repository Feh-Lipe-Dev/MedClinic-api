import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDTO {
    @IsNotEmpty({ message: 'e-mail é obrigatório.' })
    @IsEmail({}, { message: 'e-mail em formato inválido.' })
    email!: string

    @IsNotEmpty({ message: 'senha é obrigatória.' })
    senha!: string
}