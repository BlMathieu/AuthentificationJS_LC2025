import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectThunk = createAsyncThunk('asyncConnectThunk', async (credentials: { login: string, password: string }) => {
    const response =  await fetch('http://localhost:3000/authentication/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
    }).then((value) => {
        return value.json();
    }).catch((error) => {
        console.error(error);
    });
    console.log(response)
    return response
})

export const refreshThunk = createAsyncThunk('asyncRefreshThunk', async () => {
    return await fetch('http://localhost:3000/authentication/refresh', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
    }).then((value) => {
        return value.json();
    }).catch((error) => {
        console.error(error);
    })
})