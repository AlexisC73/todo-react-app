import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { getMeThunk } from './store/auth/usecases/get-me.usecase'
import { AdonisUserRepository } from './lib/infrastructures/adonis-backend.repository'
import { createStore } from './store/store'
import About from './pages/About'

const userRepository = new AdonisUserRepository(import.meta.env.PROD ? 'https://todo.alexis-comte.com/api' : 'http://localhost:3333/api')

export const store = createStore({
  userRepository
})

export const loader = async () => {
  return await store.dispatch(getMeThunk())
}

export const createRouter = () => {
  return createBrowserRouter([{
    path: '/',
    loader,
    children: [{
      index: true,
      element: <Home />
    }, {
      path: 'about',
      element: <About />
    }]
  }])
}
