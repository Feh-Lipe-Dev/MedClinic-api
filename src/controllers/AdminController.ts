import { Request, Response } from 'express'

export class AdminController {
    async ping(_req: Request, res: Response) {
        return res.status(200).json({ mensagem: 'pong' })
    }
}