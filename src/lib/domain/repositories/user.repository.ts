export interface UserRepository {
  signin: (params: { email: string, password: string }) => Promise<{ user: { id: string, name: string }, token: string }>
  signout: (params: { token: string }) => Promise<void>
}
