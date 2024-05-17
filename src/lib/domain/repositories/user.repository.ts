import type * as E from 'fp-ts/Either'
import { type SigninError } from '../../../store/auth/usecases/errors'

export interface UserRepository {
  signin: (params: { email: string, password: string }) => Promise<E.Either<SigninError, { user: { id: string, email: string } }>>
  signout: () => Promise<void>
  getMe: () => Promise<E.Either<SigninError, { user: { id: string, email: string } }>>
}
