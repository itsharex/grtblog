// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { RegisterApiData, RegisterApiError, RegisterApiResponse, AddNewTagApiData, AddNewTagApiError, AddNewTagApiResponse, AddArticleApiData, AddArticleApiError, AddArticleApiResponse, HelloError, HelloResponse } from './types.gen';

export const client = createClient(createConfig());

export const registerApi = <ThrowOnError extends boolean = false>(options: Options<RegisterApiData, ThrowOnError>) => {
    return (options?.client ?? client).post<RegisterApiResponse, RegisterApiError, ThrowOnError>({
        ...options,
        url: '/user/register'
    });
};

export const addNewTagApi = <ThrowOnError extends boolean = false>(options: Options<AddNewTagApiData, ThrowOnError>) => {
    return (options?.client ?? client).post<AddNewTagApiResponse, AddNewTagApiError, ThrowOnError>({
        ...options,
        url: '/tag/add'
    });
};

export const addArticleApi = <ThrowOnError extends boolean = false>(options: Options<AddArticleApiData, ThrowOnError>) => {
    return (options?.client ?? client).post<AddArticleApiResponse, AddArticleApiError, ThrowOnError>({
        ...options,
        url: '/article'
    });
};

export const hello = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<HelloResponse, HelloError, ThrowOnError>({
        ...options,
        url: '/test/hello'
    });
};