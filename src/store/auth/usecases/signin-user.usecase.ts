import { createAppAsyncThunk } from '../../create-app-thunk'
import { SigninError } from './errors'

export const loginThunk = createAppAsyncThunk('auth/login', async (params: LoginThunkParams, { extra: { userRepository } }) => {
  if (!params.email || !params.password) {
    throw new SigninError('email or password is empty')
  }

  const signinUser = await userRepository.signin(params)

  if (signinUser._tag === 'Left') {
    throw signinUser.left
  }

  return signinUser.right
})

export interface LoginThunkParams {
  email: string
  password: string
}
