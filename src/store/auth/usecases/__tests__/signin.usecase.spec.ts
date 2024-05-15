import { describe, test, beforeEach } from 'vitest'
import { createAuthFixture, type AuthFixture } from './authFixture'

describe('Signin usecase', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('user successfully logged in', async () => {
    authFixture.givenSigninWillSuccessForUser({ user: { id: '1', name: 'John' }, token: 'token' })

    await authFixture.whenUserSignin({ email: 'test@test.fr', password: 'password' })

    authFixture.thenUserShouldBeLoggedAs({ user: { id: '1', name: 'John' }, token: 'token', loading: false })
  })
})
