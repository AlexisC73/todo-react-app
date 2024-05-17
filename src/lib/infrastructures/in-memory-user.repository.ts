import { SigninError } from '../../store/auth/usecases/errors'
import { type UserRepository } from '../domain/repositories/user.repository'
import * as E from 'fp-ts/Either'

export class InMemoryUserRepository implements UserRepository {
  userLoggedWith: { user: { id: string, email: string } } | null = null

  signin = async (_: { email: string, password: string }) => {
    if (this.userLoggedWith === null) {
      return E.left(new SigninError('Error while signing in'))
    }
    return E.right(this.userLoggedWith)
  }

  signout: () => Promise<void> = async () => {
    await Promise.resolve()
  }

  getMe: () => Promise<E.Either<SigninError, { user: { id: string, email: string } }>> = async () => {
    if (this.userLoggedWith === null) {
      return E.left(new SigninError('Error while getting me'))
    }
    return E.right(this.userLoggedWith)
  }
}
