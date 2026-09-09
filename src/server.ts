import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './database/data-source'
import { routes } from './routes'
import { notFound } from './middlewares/notFound'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados (PostgreSQL/Neon) estabelecida.")
        app.listen(PORT, () => {
            console.log(`MedClinic API rodando em http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log("Erro ao conectar com o banco de dados: ", err)
    })