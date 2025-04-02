import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import BaseForm from "./BaseForm";
import { useDispatch } from "react-redux";
import { AppDispatch, connectThunk } from "@/stores/AuthenticationStore";

export default function Login() {
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(connectThunk({ login: username, password: password }));
    }
    return (
        <BaseForm handleForm={handleForm}>
            <>
                <fieldset>
                    <legend>Se connecter</legend>
                    <div>
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input required id="username" type="text" placeholder="nom d'utilisateur ..." onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input type="password" id="password" placeholder="mot de passe ..." onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </fieldset>
                <Button>Se connecter</Button>
            </>
        </BaseForm>
    )
}