import type * as E from 'fp-ts/Either'
import { type SigninError } from '../../../store/auth/usecases/errors'

export interface UserRepository {
  signin: (params: { email: string, password: string }) => Promise<E.Either<SigninError, { user: { id: string, name: string }, token: string }>>
  signout: (params: { token: string }) => Promise<void>
}
