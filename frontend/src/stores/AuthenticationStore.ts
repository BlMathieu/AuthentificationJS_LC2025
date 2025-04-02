import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

export interface AuthStore {
    token: string,
    user: { username: string, isAdmin: boolean, iat: number }
    isLogged: boolean
}

export const connectThunk = createAsyncThunk('asyncConnectThunk', async (credentials: { login: string, password: string }) => {
    return await fetch('http://localhost:3000/authentication/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then((value) => {
        return value.json();
    }).catch((error) => {
        console.error(error);
    });
})

export const refreshThunk = createAsyncThunk('asyncRefreshThunk', async () => {
    return await fetch('http://localhost:3000/authentication/refresh',{
        method:'POST',
        headers:{'content-type': 'application/json', 'authorization':`bearer ${state.token}`}
    }).then((value)=>{
        return value.json()
    }).catch((error)=>{
        console.error(error);
    })
})

export const authSlice = createSlice({
    name: 'authenticator',
    initialState: <AuthStore>{
        token: '',
        user: { username: '', isAdmin: false, iat: 0 },
        isLogged: false,
    },
    reducers: {
        disconnect: (state) => {
            state.token = '';
            state.user = { username: '', isAdmin: false, iat: 0 };
            state.isLogged = false;
        },
        setIsLogged: (state, action) => {
            const logState = action.payload;
            state.isLogged = logState;
            if (!logState) {
                state.token = '';
                state.user = { username: '', isAdmin: false, iat: 0 };
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(connectThunk.fulfilled || refreshThunk.fulfilled, (state, action) => {
            const response = action.payload;
            if (!response.status) throw new Error(response.message);
            state.token = response.token;
            state.user = jwtDecode(response.token);
            state.isLogged = true;
        }).addCase(connectThunk.rejected || refreshThunk.rejected, (state, action) => {
            state.token = '';
            state.user = { username: '', isAdmin: false, iat: 0 };
            console.error(action.error);
        })
    },
})

export const { disconnect, setIsLogged } = authSlice.actions;
const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})
export type AppDispatch = typeof authStore.dispatch;
export default authStore;