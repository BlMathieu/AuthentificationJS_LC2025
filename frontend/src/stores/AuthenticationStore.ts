import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

interface AuthStore {
    token: string,
    isLoading: boolean,
    user: { login: string, roles: string, exp: number }
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

export const authSlice = createSlice({
    name: 'authenticator',
    initialState: <AuthStore>{
        token: '',
        isLoading: false,
        user: { login: '', roles: '', exp: 0 },
    },
    reducers: {
        disconnect: (state) => {
            state.token = '';
            state.user = { login: '', roles: '', exp: 0 };
        }
    },
    extraReducers(builder) {
        builder.addCase(connectThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            const response = action.payload;
            state.token = response.accessToken;
            state.user = jwtDecode(response.accessToken);
        }).addCase(connectThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.token = '';
            state.user = { login: '', roles: '', exp: 0 };
            console.error(action.error);
        })
    },
})

export const { disconnect } = authSlice.actions;

const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})
export type AppDispatch = typeof authStore.dispatch;
export default authStore;