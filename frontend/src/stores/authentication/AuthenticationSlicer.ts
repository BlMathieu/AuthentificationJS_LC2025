import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { connectThunk, refreshThunk } from "./AuthenticationThunkMiddleware";

export interface AuthStore {
    token: string,
    user: { username: string, role: string, iat: number }
    isLogged: boolean
}

const resetStates = (state: AuthStore) => {
    state.token = '';
    state.user = { username: '', role: 'invite', iat: 0 };
    state.isLogged = false;
}

const handleSuccess = (state: any, action: any) => {
    const response = action.payload;
    if (!response.status) throw new Error(response.message);
    state.token = response.token;
    state.user = jwtDecode(response.token);
    state.isLogged = true;
}
const handleError = (state: any, action: any) => {
    resetStates(state);
    console.error(action.error);
}

export const authSlice = createSlice({
    name: 'authenticator',
    initialState: <AuthStore>{
        token: '',
        user: { username: '', role: 'invite', iat: 0 },
        isLogged: false,
    },
    reducers: {
        disconnect: resetStates,
        setIsLogged: (state, action) => {
            const logState = action.payload;
            state.isLogged = logState;
            if (!logState) resetStates;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(connectThunk.fulfilled, handleSuccess)
            .addCase(connectThunk.rejected, handleError)
            .addCase(refreshThunk.fulfilled, handleSuccess)
            .addCase(refreshThunk.rejected, handleError)
    },
})

export const { disconnect, setIsLogged } = authSlice.actions