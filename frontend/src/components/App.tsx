import { useSelector } from 'react-redux'
import Login from './forms/Login'
import Register from './forms/Register'
import { AuthStore } from '@/stores/authentication/AuthenticationStore';
import AuthFooter from './AuthFooter';

function App() {
  const authStore = useSelector((state: { auth: AuthStore }) => state.auth);

  return (
    <>
      <section >
        <div>
          <h1 className="text-center text-2xl font-bold">Authentification</h1>
        </div>
        <article className="flex items-center justify-center">
          <Login />
          <Register />
        </article>
      </section>
      {authStore.isLogged && <AuthFooter />}
    </>
  )
}

export default App
