import { api } from "./api";

export const loginService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ url: '/api/user_login/', method: 'POST', body: data }),
        }),
    }),
});

export const { useLoginMutation } = loginService;