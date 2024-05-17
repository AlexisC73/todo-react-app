import { expect } from 'vitest'
import { loginThunk, type LoginThunkParams } from '../signin-user.usecase'
import { createStore, createTestStore } from '../../../store'
import { type AuthState } from '../../reducer'
import { InMemoryUserRepository } from '../../../../lib/infrastructures/in-memory-user.repository'
import { stateBuilderProvider } from '../../../state-builder'
import { signoutThunk } from '../signout-user.usecase'
import { getMeThunk } from '../get-me.usecase'

export const createAuthFixture = (testStateBuilderProbider = stateBuilderProvider()) => {
  const userRepository = new InMemoryUserRepository()

  let store = createStore({
    userRepository
  })

  return {
    givenSigninWillSuccessForUser: (loggedUser: { user: { id: string, email: string } }) => {
      userRepository.userLoggedWith = loggedUser
    },
    userAuthenticatedWith: (loggedUser: { user: { id: string, email: string } }) => {
      userRepository.userLoggedWith = loggedUser
    },
    givenSigninWillReject: () => {
      userRepository.userLoggedWith = null
    },
    givenUserIsLoggedIn: ({ user }: { user: { id: string, email: string } }) => {
      testStateBuilderProbider.setState(builder => builder.withAuthState({ user, loading: false }))
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
    whenUserGetPersonnalInformations: async () => {
      await store.dispatch(getMeThunk())
    },
    thenUserShouldBeLoggedAs: (expectedAuthState: AuthState) => {
      expect(store.getState().auth).toEqual(expectedAuthState)
    },
    thenUserShouldBeLoggedOut: () => {
      expect(store.getState().auth).toEqual({ user: null, loading: false })
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
