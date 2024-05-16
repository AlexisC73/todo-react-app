import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from './store/store.ts'
import { InMemoryUserRepository } from './lib/infrastructures/in-memory-user.repository.ts'

const userRepository = new InMemoryUserRepository()

userRepository.userLoggedWith = { user: { id: '1', name: 'Alexis' }, token: 'token' }

const store = createStore({
  userRepository
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
