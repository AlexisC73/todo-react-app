import { type UserRepository } from '../domain/repositories/user.repository'

export class InMemoryUserRepository implements UserRepository {
  userSuccessfullyLoggedWith!: { user: { id: string, name: string }, token: string }

  signin = async (_: { email: string, password: string }) => {
    return this.userSuccessfullyLoggedWith
  }

  signout: (params: { token: string }) => Promise<void> = async () => {}
}
