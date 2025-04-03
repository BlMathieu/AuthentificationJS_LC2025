import { createListenerMiddleware } from "@reduxjs/toolkit";
import { refreshThunk } from "./AuthenticationThunkMiddleware";
import { AuthStore } from "./AuthenticationSlicer";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    predicate: (_action, currentState: any, oldState: any) => {
        return !currentState.auth.isLogged && oldState.auth.isLogged;
    },
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState() as AuthStore;
        if (!state.isLogged) listenerApi.dispatch(refreshThunk());
    }
})

export default listenerMiddleware;