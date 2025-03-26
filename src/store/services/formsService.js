import { api } from "./api";

export const manufacturerService = api.injectEndpoints({
    endpoints: (builder) => ({
        createDealer: builder.mutation({
            query: (data) => ({
                url: '/api/dealer/create_dealer/',
                method: 'POST',
                body: data,
            }),
        }),
        createDevice: builder.mutation({
            query: (data) => ({
                url: '/api/devicemodel/devicemodelCreate/',
                method: 'POST',
                body: data,
            }),
        }),
        createDeviceStock: builder.mutation({
            query: (data) => ({
                url: 'api/devicestock/deviceStockCreate/',
                method: 'POST',
                body: data,
            }),
        }),
        DeviceModelOTPVerify: builder.mutation({
            query: (data) => ({
                url: 'api/devicemodel/devicemodelManufacturerOtpVerify/',
                method: 'POST',
                body: data,
            }),
        }),
        TACExtension: builder.mutation({
            query: (data) => ({
                url: '/api/devicemodel/COPUpload/',
                method: 'POST',
                body: data,
            }),
        }),
        CopVerify: builder.mutation({
            query: (data) => ({
                url: 'api/devicemodel/COPManufacturerOtpVerify/',
                method: 'POST',
                body: data,
            }),
        }),
        CreateDeviceStock: builder.mutation({
            query: (data) => ({
                url: "api/devicestock/deviceStockCreate/",
                method: 'POST',
                body: data
            }),
        }),
        BulkDeviceStock: builder.mutation({
            query: (data) => ({
                url: "/api/devicestock/deviceStockCreateBulk/",
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useCreateDealerMutation, useCreateDeviceMutation, useTACExtensionMutation, useDeviceModelOTPVerifyMutation, useCopVerifyMutation, useCreateDeviceStockMutation, useBulkDeviceStockMutation } = manufacturerService;
