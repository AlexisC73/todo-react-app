import { describe, test, beforeEach } from 'vitest'
import { createAuthFixture, type AuthFixture } from './authFixture'

describe('Signin usecase', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('user successfully logged in', async () => {
    authFixture.givenUserIsLoggedIn({ user: { id: '1', name: 'John' }, token: 'token' })

    await authFixture.whenUserSignout()

    authFixture.thenUserShouldBeLoggedOut()
  })
})
