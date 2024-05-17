import { loginThunk } from '../store/auth/usecases/signin-user.usecase'
import { signoutThunk } from '../store/auth/usecases/signout-user.usecase'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function Home () {
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(loginThunk({ email: 'alexis.73400@icloud.com', password: 'custom-pass' }))
  }

  const handleLogout = () => {
    dispatch(signoutThunk())
  }

  return (
    <div>
      {auth.user !== null
        ? (
        <>
          <h1>Welcome, {auth.user.email}</h1>
          <button onClick={handleLogout}>Me Déconnecter</button>
        </>
          )
        : (
        <>
          <h1>Welcome, Guest</h1>
          <button onClick={handleLogin} disabled={auth.loading}>{auth.loading ? 'Connexion en cours...' : 'Me Connecter'}</button>
        </>
          )}

          <pre>{JSON.stringify(auth)}</pre>
          <p>v0.1.x</p>
    </div>
  )
}

export default Home
