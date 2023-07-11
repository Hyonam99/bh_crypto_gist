import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const exchangeHeaders = {
    'X-RapidAPI-Key': 'd15e160145msh0cc22b16bc39bf1p16655bjsn9d3bc7dc22f9',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = 'https://coingecko.p.rapidapi.com';

const createRequest = (url) => ({url, headers: exchangeHeaders})

export const exchangeApi = createApi({
    reducerPath: 'exchangeDetails',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getExchangeDetails: builder.query({
            query: () => createRequest(`/exchanges`),
        })
    })
})

export const {useGetExchangeDetailsQuery} = exchangeApi;
