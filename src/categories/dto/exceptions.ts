import { ConflictException, NotFoundException } from '@nestjs/common'

export class DuplicatedCategoryException extends ConflictException {
  public constructor() {
    super('Category must have unique name - type - group')
  }
}

// Extending NotFoundException instead of ForbiddenException
// to prevent the user from even knowing the category exists
export class CategoryNotBelongToUserException extends NotFoundException {
  public constructor() {
    super('Cannot find the requested category')
  }
}

export class CategoryNotExistException extends NotFoundException {
  public constructor() {
    super('Cannot find the requested category')
  }
}
