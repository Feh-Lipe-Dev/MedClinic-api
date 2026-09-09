import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { Usuario } from '../entities/Usuario'

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
    synchronize: true,
    logging: false,
    entities: [Usuario]
})