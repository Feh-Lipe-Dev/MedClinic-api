import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiError } from '../middlewares/errorHandler'

export async function validarDto<T extends object>(
    dtoClass: ClassConstructor<T>,
    payload: Record<string, unknown>
): Promise<T> {
    const dto = plainToInstance(dtoClass, payload)
    const erros = await validate(dto)

    if (erros.length > 0) {
        const mensagens = erros.flatMap((erro) =>
            Object.values(erro.constraints ?? {})
        )
        throw new ApiError(400, mensagens.join('; '))
    }

    return dto
}