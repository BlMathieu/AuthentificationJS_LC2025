import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import BaseForm from "./BaseForm";

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        if (password != confirmPassword) throw new Error("Les mots de passes ne correspondent pas !");
        const params = JSON.stringify({ login: username, password: password });
        await fetch('http://localhost:3000/authentication/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: params,
        }).then((value) => { return value.json() }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <BaseForm handleForm={handleForm}>
            <>
                <fieldset>
                    <legend>Créer un compte</legend>
                    <div>
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input required id="username" type="text" placeholder="nom d'utilisateur ..." onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input type="password" id="password" placeholder="mot de passe ..." onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input type="password" id="confirmPassword" placeholder="mot de passe ..." onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </div>
                </fieldset>
                <Button>Se connecter</Button>
            </>
        </BaseForm>

    )
}
