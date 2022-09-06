import { Request as ExpressRequest } from 'express'
import { User } from './users/entities/user.entity'

export interface Request extends ExpressRequest {
  user?: User
}
