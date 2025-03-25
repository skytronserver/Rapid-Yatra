import { api } from "./api";

export const loginService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ url: '/api/user_login/', method: 'POST', body: data }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/api/validate_otp/',
                method: 'POST',
                body: data
            }),
        }),
        resendOtp: builder.mutation({
            query: ({ mobile, token }) => ({
                url: '/api/send_sms_otp/',
                method: 'POST',
                body: { mobile, token },
                headers: {
                    Authorization: `Token ${token}`
                }
            }),
        }),
        logout: builder.mutation({
            query: (token) => ({
                url: '/api/user_logout/',
                method: 'POST',
                body: { token },
                headers: {
                    Authorization: `Token ${token}`
                }
            }),
        }),
    }),
});

export const { 
    useLoginMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useLogoutMutation
} = loginService;