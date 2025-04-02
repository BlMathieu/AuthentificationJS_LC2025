import { useSelector } from 'react-redux'
import Login from './forms/Login'
import Register from './forms/Register'
import { AuthStore } from '@/stores/AuthenticationStore';

function App() {
  const user = useSelector((state: AuthStore) => state.user);
  const isLogged = user.exp - Date.now() > 0

  return (
    <>
      <section className="flex items-center justify-center">
        <Login />
        <Register />

      </section>
      <footer>
        {
          isLogged && (<p>{user.login}</p>)
        }
      </footer>
    </>

  )
}

export default App
