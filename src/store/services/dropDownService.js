import { api } from "./api";

export const dropDownService = api.injectEndpoints({
    endpoints: (builder) => ({
        getEsimList: builder.query({
            query: () => ({
                url: '/api/eSimProvider/filter_eSimProvider/',
                method: 'POST'
            }),
            providesTags: ['EsimList'],
            transformResponse: (response) => {
                const data = Array.isArray(response) ? response : response?.results || [];
                return data
                    .filter(simProvider => 
                        simProvider?.users?.length > 0 && 
                        simProvider.users[0]?.status !== 'pending'
                    )
                    .map(simProvider => ({
                        value: simProvider.id,
                        label: simProvider.company_name || 'Unknown Provider'
                    }));
            },
        }),
        getModelList: builder.query({
            query: () => ({
                url: '/api/devicemodel/devicemodelFilter/',
                method: 'POST'
            }),
            providesTags: ['ModelList'],
        }),
        getModel: builder.query({
            query: (id) => ({
                url: `api/devicemodel/devicemodelDetails/${id}`,
                method: 'GET'
            }),
            providesTags: ['Model'],
        }),
        getDealerList: builder.query({
            query: () => ({
                url: '/api/dealer/filter_dealer/',
                method: 'POST'
            }),
            providesTags: ['DealerList'],
        }),
        getDeviceStockList: builder.query({
            query: (data) => ({
                url: '/api/devicestock/deviceStockFilter/',
                method: 'POST',
                body: data
            }),
            providesTags: ['DeviceStockList'],
        }),
    }),
});

export const { useGetEsimListQuery, useGetModelListQuery, useGetModelQuery, useGetDealerListQuery, useGetDeviceStockListQuery } = dropDownService;
