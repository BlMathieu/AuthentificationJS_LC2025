import { AuthStore, setIsLogged } from '@/stores/authentication/AuthenticationSlicer';
import { AppDispatch } from '@/stores/authentication/AuthenticationStore';
import { logoutThunk, refreshThunk } from '@/stores/authentication/AuthenticationThunkMiddleware';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
export default function AuthFooter() {

    const authStore = useSelector((state: { auth: AuthStore }) => state.auth);
    const [loginDelay, setLoginDelay] = useState(Number(authStore.user.iat - Date.now()) / 1000);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (authStore.isLogged) {
            const interval = setInterval(() => {
                setLoginDelay(Number(authStore.user.iat - Date.now()) / 1000);
                const logState = authStore.user.iat - Date.now() > 0;
                if (logState === false) dispatch(setIsLogged(logState));
            }, 100)
            return () => clearInterval(interval);
        }
    }, [authStore.user.iat, dispatch, authStore.isLogged])

    return (
        <footer className="fixed bottom-0 bg-black w-[100%] flex justify-between border [&>p]:mx-2 [&>div]:flex [&>div]:items-center">
            <div>
                <p>Utilisateur : {authStore.user.username}</p>
                <p>|</p>
                <p>Role : {authStore.user.role}</p>
                <p>|</p>
                <p>Expiration : {loginDelay} secondes</p>
            </div>
            <div>
                <Button onClick={() => { dispatch(logoutThunk()); }}>Déconnecter</Button>
            </div>
        </footer>
    )

}