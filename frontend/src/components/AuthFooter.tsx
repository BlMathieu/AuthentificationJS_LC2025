import { AuthStore, setIsLogged } from '@/stores/AuthenticationStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function AuthFooter() {

    const authStore = useSelector((state: { auth: AuthStore }) => state.auth);
    const [loginDelay, setLoginDelay] = useState(Number(authStore.user.iat - Date.now()) / 1000);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            setLoginDelay(Number(authStore.user.iat - Date.now()) / 1000);
            dispatch(setIsLogged(authStore.user.iat - Date.now() > 0));
        }, 100)
        return () => clearInterval(interval);
    }, [authStore.user.iat])
   
    return (
        <footer className="fixed bottom-0 bg-black w-[100%] border flex  [&>p]:mx-2">
            <p>Utilisateur : {authStore.user.username}</p>
            <p>|</p>
            <p>estAdmin : {authStore.user.isAdmin.toString()}</p>
            <p>|</p>
            <p>expiration : {loginDelay} secondes</p>
        </footer>
    )

}