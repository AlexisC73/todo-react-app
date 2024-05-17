import { createAppAsyncThunk } from '../../create-app-thunk'

export const signoutThunk = createAppAsyncThunk('auth/signout', async (_, { extra: { userRepository }, getState }) => {
  const user = getState().auth.user
  if (user === null) return
  await userRepository.signout()
})
