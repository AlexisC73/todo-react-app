import { expect } from 'vitest'
import { loginThunk, type LoginThunkParams } from '../signin-user.usecase'
import { createStore, createTestStore } from '../../../store'
import { type AuthState } from '../../reducer'
import { InMemoryUserRepository } from '../../../../lib/infrastructures/in-memory-user.repository'
import { stateBuilderProvider } from '../../../state-builder'
import { signoutThunk } from '../signout-user.usecase'

export const createAuthFixture = (testStateBuilderProbider = stateBuilderProvider()) => {
  const userRepository = new InMemoryUserRepository()

  let store = createStore({
    userRepository
  })

  return {
    givenSigninWillSuccessForUser: ({ user, token }: { user: { id: string, name: string }, token: string }) => {
      userRepository.userSuccessfullyLoggedWith = { user, token }
    },
    givenUserIsLoggedIn: ({ user, token }: { user: { id: string, name: string }, token: string }) => {
      testStateBuilderProbider.setState(builder => builder.withAuthState({ user, token, loading: false }))
      store = createTestStore({
        userRepository
      }, testStateBuilderProbider.getState())
    },
    whenUserSignin: async (params: LoginThunkParams) => {
      await store.dispatch(loginThunk(params))
    },
    whenUserSignout: async () => {
      await store.dispatch(signoutThunk())
    },
    thenUserShouldBeLoggedAs: (expectedAuthState: AuthState) => {
      expect(store.getState().auth).toEqual(expectedAuthState)
    },
    thenUserShouldBeLoggedOut: () => {
      expect(store.getState().auth).toEqual({ user: null, token: null, loading: false })
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
