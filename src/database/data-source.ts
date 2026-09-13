import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { Usuario } from '../entities/Usuario'
import { CriarTabelaUsuarios } from './migrations/CriarTabelaUsuarios'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:
        process.env.DB_SSL === "true"
            ? { rejectUnauthorized: false }
            : false,
    synchronize: false,
    migrations: [CriarTabelaUsuarios],
    logging: false,
    entities: [Usuario]
})