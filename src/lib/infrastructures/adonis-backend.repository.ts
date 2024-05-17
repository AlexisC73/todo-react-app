import { type Either } from 'fp-ts/lib/Either'
import { SigninError } from '../../store/auth/usecases/errors'
import { type UserRepository } from '../domain/repositories/user.repository'
import * as E from 'fp-ts/lib/Either'

export class AdonisUserRepository implements UserRepository {
  constructor (private readonly endpoint = 'http://localhost:3333/api') {}
  signin: (params: { email: string, password: string }) => Promise<Either<SigninError, { user: { id: string, email: string } }>> = async (params) => {
    const response = await fetch(`${this.endpoint}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
      credentials: 'include'
    })
    const data = await response.json()
    return E.right({ user: { id: data.id, email: data.email } })
  }

  signout: () => Promise<void> = async () => {
    await fetch(`${this.endpoint}/auth/signout`, {
      method: 'GET',
      credentials: 'include'
    })
  }

  getMe: () => Promise<Either<SigninError, { user: { id: string, email: string } }>> = async () => {
    const response = await fetch(`${this.endpoint}/auth/me`, {
      method: 'GET',
      credentials: 'include'
    })
    if (!response.ok) return E.left(new SigninError('User not authenticated'))

    const data = await response.json()
    return E.right({ user: { id: data.id, email: data.email } })
  }
}
