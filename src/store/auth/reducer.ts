import { createReducer } from '@reduxjs/toolkit'
import { loginThunk } from './usecases/signin-user.usecase'
import { signoutThunk } from './usecases/signout-user.usecase'
import { getMeThunk } from './usecases/get-me.usecase'

export interface AuthState {
  user: { id: string, email: string } | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false
}

export const authReducer = createReducer<AuthState>(
  initialState,
  (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state = { user: action.payload.user, loading: false }
      return state
    }).addCase(loginThunk.pending, (state) => {
      state.loading = true
    }).addCase(loginThunk.rejected, (state) => {
      state.loading = false
    }).addCase(signoutThunk.fulfilled, (state) => {
      state = { user: null, loading: false }
      return state
    }).addCase(getMeThunk.fulfilled, (state, action) => {
      state = { user: action.payload.user, loading: false }
      return state
    }).addCase(getMeThunk.pending, (state) => {
      state.loading = true
    }).addCase(getMeThunk.rejected, (state) => {
      state.user = null
      state.loading = false
    })
  }
)
