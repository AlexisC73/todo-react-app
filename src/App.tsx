import { logoutAction } from './store/auth/reducer'
import { loginThunk } from './store/auth/usecases/signin-user.usecase'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App () {
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(loginThunk({ email: 'test@test.fr', password: 'password' }))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <div>
      {auth.user !== null
        ? (
        <>
          <h1>Welcome, {auth.user.name}</h1>
          <button onClick={handleLogout}>Me Déconnecter</button>
        </>
          )
        : (
        <>
          <h1>Welcome, Guest</h1>
          <button onClick={handleLogin} disabled={auth.loading}>{auth.loading ? 'Connexion en cours...' : 'Me Connecter'}</button>
        </>
          )}
    </div>
  )
}

export default App
