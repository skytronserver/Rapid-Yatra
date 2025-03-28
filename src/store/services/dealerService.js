import { api } from "./api";

export const dealerService = api.injectEndpoints({
    endpoints: (builder) => ({
        requestEsimActivation: builder.mutation({
            query: (data) => ({
                url: 'api/devicestock/deviceStockFilter/',
                method: 'POST',
                body: data,
            }),
        }),
        sendActivationRequest: builder.mutation({
            query: (data) => ({
                url: 'api/esimActivateReq/create/',
                method: 'POST',
                body: data,
            }),
        }),
        
    }),
});

export const { useRequestEsimActivationMutation, useSendActivationRequestMutation } = dealerService;
