import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";


export type TUser = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: string;
    image_url?: string;

}

export const usersAPI = createApi({ // sets up API endpoints for user management - creating users and verifying them etc
    reducerPath: 'usersAPI', // this is the key in the store where the API state will be stored - name of the API in the store
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain, // base URL for the API - this is the domain where the API is hosted
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token; // get the token from the user slice of the state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // set the Authorization header with the token
            }
            headers.set('Content-Type', 'application/json'); // set the Content-Type header to application/json
            return headers; // return the headers to be used in the request
        }
    }), // base query function that will be used to make requests to the API

    // used to invalidate the cache when a mutation is performed 
    //  it helps to keep the data fresh in the cache, that is to mean that when a user is created, the cache is invalidated so that the next time the users are fetched, the new user is included in the list.
    tagTypes: ['Users'], // tag types for invalidation 
    endpoints: (builder) => ({ //builder is a function that helps to define the endpoints for the API
        createUsers: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // invalidates the cache for the Users tag when a new user is created
        }),
        verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
            query: (data) => ({
                url: '/auth/verify',
                method: 'POST',
                body: data,
            }),
        }),
        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['Users']
        }),
        // update user
        updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
            query: (user) => ({
                url: `/user/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),
        getUserById: builder.query<TUser, number>({
            query: (id) => `/user/${id}`,
        }),

    })
})

