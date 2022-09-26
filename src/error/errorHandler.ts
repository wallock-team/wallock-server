import {
  BadRequestException,
  ConflictException,
  ForbiddenException
} from '@nestjs/common'
import { ErrorMessage } from './errorMessage'

export const handleError = (error: string) => {
  switch (error) {
    case ErrorMessage.AccessDenied:
      throw new ForbiddenException(error)
    case ErrorMessage.NotFoundCategory:
      throw new BadRequestException(error)
    case ErrorMessage.NotFoundUser:
      throw new BadRequestException(error)
    case ErrorMessage.NotFoundTransaction:
      throw new BadRequestException(error)
    case ErrorMessage.CategoryAlreadyExists:
      throw new ConflictException(error)
    case ErrorMessage.UserAlreadyExists:
      throw new ConflictException(error)
    default:
      throw new Error('Default')
  }
}
