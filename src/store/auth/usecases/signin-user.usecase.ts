import { createAppAsyncThunk } from '../../create-app-thunk'

export const loginThunk = createAppAsyncThunk('auth/login', async (params: LoginThunkParams, { extra: { userRepository } }) => {
  return await userRepository.signin(params)
})

export interface LoginThunkParams {
  email: string
  password: string
}
