import { SigninError } from '../../store/auth/usecases/errors'
import { type UserRepository } from '../domain/repositories/user.repository'
import * as E from 'fp-ts/Either'

export class InMemoryUserRepository implements UserRepository {
  userLoggedWith: { user: { id: string, name: string }, token: string } | null = null

  signin = async (_: { email: string, password: string }) => {
    if (this.userLoggedWith === null) {
      return E.left(new SigninError('user not found'))
    }
    return E.right(this.userLoggedWith)
  }

  signout: (params: { token: string }) => Promise<void> = async () => {}
}
