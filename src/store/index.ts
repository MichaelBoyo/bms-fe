import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { service } from "@/services/services";

export function makeStore() {
    return configureStore({
        reducer: {
            [auth.reducerPath]: auth.reducer,
            [service.reducerPath]: service.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                auth.middleware,
                service.middleware,
            ),
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;
