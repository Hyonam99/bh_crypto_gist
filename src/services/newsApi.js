import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const newsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'd15e160145msh0cc22b16bc39bf1p16655bjsn9d3bc7dc22f9',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: newsHeaders})

export const newsApi = createApi({
    reducerPath: 'news',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const {useGetNewsQuery} = newsApi;

