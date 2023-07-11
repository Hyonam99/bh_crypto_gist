import {configureStore} from "@reduxjs/toolkit";
import {cryptoApi} from '../services/cryptoApi';
import {newsApi} from '../services/newsApi';
import {exchangeApi} from "../services/exchangeDetails";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [exchangeApi.reducerPath]: exchangeApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware, exchangeApi.middleware, newsApi.middleware)
});
