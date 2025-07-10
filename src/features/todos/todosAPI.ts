import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";


export type TTodo = {
    id: number;
    todoName: string;
    description: string;
    userId: number;
    dueDate: string;
    createdAt: string;
    isCompleted: boolean;
}

export const todosAPI = createApi({
    reducerPath: 'todosAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token; // get the token from the user slice of the state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // set the Authorization header with the token
            }
            headers.set('Content-Type', 'application/json'); // set the Content-Type header to application/json
            return headers; // return the headers to be used in the request
        }
    }),

    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        createTodo: builder.mutation<TTodo, Partial<TTodo>>({
            query: (newTodo) => ({
                url: '/todo',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos'] // invalidates the cache for the Todos tag when a new todo is created
        }),
        getTodos: builder.query<{ data: TTodo[] }, void>({ //void means no parameters are needed to fetch the todos
            query: () => '/todos',
            providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
        }),
        updateTodo: builder.mutation<TTodo, Partial<TTodo> & { id: number }>({ //& { id: number } is used to ensure that the id is always present when updating a todo
            query: (updatedTodo) => ({
                url: `/todo/${updatedTodo.id}`,
                method: 'PUT',
                body: updatedTodo
            }),
            invalidatesTags: ['Todos'] // invalidates the cache for the Todos tag when a todo is updated
        }),
        deleteTodo: builder.mutation<{ success: boolean, id: number }, number>({ //success: boolean indicates whether the deletion was successful, id: number is the id of the todo that was deleted, number is the type of the id parameter
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos'] // invalidates the cache for the Todos tag when a todo is deleted
        }),
        // get todos by user id
        getTodosByUserId: builder.query<{ data: TTodo[] }, number>({
            query: (userId) => `/todo/user/${userId}`,
            providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
        })
    })
})