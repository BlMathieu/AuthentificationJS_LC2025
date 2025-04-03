import { useDispatch, useSelector } from 'react-redux'
import Login from './forms/Login'
import Register from './forms/Register'
import AuthFooter from './AuthFooter';
import { useEffect } from 'react';
import { refreshThunk } from '@/stores/authentication/AuthenticationThunkMiddleware';
import { AuthStore } from '@/stores/authentication/AuthenticationSlicer';
import { AppDispatch } from '@/stores/authentication/AuthenticationStore';

function App() {
  const authStore = useSelector((state: { auth: AuthStore }) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

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

