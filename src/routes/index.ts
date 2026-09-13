import { Router } from 'express'
import { adminRoutes } from './admin.routes'
import { authRoutes } from './auth.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', usersRoutes)
routes.use('/admin', adminRoutes)

export { routes }