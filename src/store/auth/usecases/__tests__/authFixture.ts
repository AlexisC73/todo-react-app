import { expect } from 'vitest'
import { loginThunk, type LoginThunkParams } from '../signin-user.usecase'
import { createStore } from '../../../store'
import { type AuthState } from '../../reducer'
import { InMemoryUserRepository } from '../../../../lib/infrastructures/in-memory-user.repository'

export const createAuthFixture = () => {
  const userRepository = new InMemoryUserRepository()

  const store = createStore({
    userRepository
  })

  return {
    givenSigninWillSuccessForUser: ({ user, token }: { user: { id: string, name: string }, token: string }) => {
      userRepository.userSuccessfullyLoggedWith = { user, token }
    },
    whenUserSignin: async (params: LoginThunkParams) => {
      await store.dispatch(loginThunk(params))
    },
    thenUserShouldBeLoggedAs: (expectedAuthState: AuthState) => {
      expect(store.getState().auth).toEqual(expectedAuthState)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
