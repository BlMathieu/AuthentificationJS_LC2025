import { configureStore } from '@reduxjs/toolkit';
import listenerMiddleware from './AuthenticationMiddleware';
import { authSlice } from './AuthenticationSlicer';

const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
export type AppDispatch = typeof authStore.dispatch;
export default authStore;