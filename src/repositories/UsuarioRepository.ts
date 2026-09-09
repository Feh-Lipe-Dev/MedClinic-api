import { Repository } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import { Usuario } from '../entities/Usuario'

export const usuarioRepository = AppDataSource.getRepository(Usuario)