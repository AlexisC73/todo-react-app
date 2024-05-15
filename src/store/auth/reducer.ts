import { createReducer } from '@reduxjs/toolkit'
import { loginThunk } from './usecases/signin-user.usecase'
import { signoutThunk } from './usecases/signout-user.usecase'

export interface AuthState {
  user: { id: string, name: string } | null
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false
}

export const authReducer = createReducer<AuthState>(
  initialState,
  (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state = { user: action.payload.user, token: action.payload.token, loading: false }
      return state
    }).addCase(loginThunk.pending, (state) => {
      state.loading = true
    }).addCase(signoutThunk.fulfilled, (state) => {
      state = { user: null, token: null, loading: false }
      return state
    })
  }
)
