import { useSelector } from 'react-redux'
import Login from './forms/Login'
import Register from './forms/Register'
import { AuthStore } from '@/stores/AuthenticationStore';
import AuthFooter from './AuthFooter';

function App() {
  const authStore = useSelector((state: { auth: AuthStore }) => state.auth);

  return (
    <>
      <section className="flex items-center justify-center">
        <Login />
        <Register />
      </section>
      {authStore.isLogged && <AuthFooter/>}
    </>

  )
}

export default App
