import { createAppAsyncThunk } from '../../create-app-thunk'

export const getMeThunk = createAppAsyncThunk('auth/getMe', async (_, { extra: { userRepository } }) => {
  const signinUser = await userRepository.getMe()

  if (signinUser._tag === 'Left') {
    throw signinUser.left
  }

  return signinUser.right
})
