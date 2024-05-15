import { createAction, createReducer, type ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { type AuthState } from './auth/reducer'
import { type RootState } from './store'

const initialState = rootReducer(undefined, { type: 'init' })

const withAuthState = createAction<AuthState>('withAuthState')

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withAuthState, (state, action) => {
    state.auth = action.payload
    return state
  })
})

export const stateBuilder = (baseState = initialState) => {
  const reduce = <P>(actionCreator: ActionCreatorWithPayload<P>) => (payload: P) => {
    return stateBuilder(reducer(baseState, actionCreator(payload)))
  }

  return {
    withAuthState: reduce(withAuthState),
    build (): RootState {
      return baseState
    }
  }
}

export const stateBuilderProvider = () => {
  let builder = stateBuilder()

  return {
    getState () {
      return builder.build()
    },
    setState (updateFn: (_builder: StateBuilder) => StateBuilder) {
      builder = updateFn(builder)
    }
  }
}

export type StateBuilder = ReturnType<typeof stateBuilder>
export type StateBuilderProvider = ReturnType<typeof stateBuilderProvider>
