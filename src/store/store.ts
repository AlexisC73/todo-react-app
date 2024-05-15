import { type Action, configureStore, type ThunkDispatch } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { type UserRepository } from '../lib/domain/repositories/user.repository'
import { InMemoryUserRepository } from '../lib/infrastructures/in-memory-user.repository'

export interface Dependencies {
  userRepository: UserRepository
}

export const createStore = (dependencies: Dependencies, preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies
      }
    }),
    preloadedState
  })
}

export const createTestStore = ({ userRepository = new InMemoryUserRepository() }: Partial<Dependencies>, preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: { userRepository }
      }
    }),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>
export type PreloadedState = Partial<RootState>
