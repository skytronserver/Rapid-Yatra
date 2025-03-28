import { api } from "./api";

export const reportsService = api.injectEndpoints({
    endpoints: (builder) => ({
        getDealerDeviceList: builder.query({
            query: () => ({ 
                url: 'https://api.gromed.in/api/sell/SellListAvailableDeviceStock/',
                method: 'GET'
            }),
            providesTags: ['DeviceList'],
        }),
        getDealersList: builder.query({
            query: (data) => ({ 
                url: '/api/dealer/filter_dealer/',
                method: 'POST',
                body: data
            }),
        }),
        getStockList: builder.query({
            query: (data) => ({ 
                url: 'api/devicestock/deviceStockFilter/',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useGetDealerDeviceListQuery, useGetDealersListQuery, useGetStockListQuery } = reportsService;
