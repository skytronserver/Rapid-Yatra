import { api } from "./api";

export const locationServices = api.injectEndpoints({
    endpoints: (builder) => ({
        getVehicles: builder.query({
            query: (data) => ({ url: '/api/get_live_vehicle_no/', method: 'POST', body: data }),
        }),
        getLiveTracking: builder.query({
            query: (data) => ({ url: '/api/gps_track_data_api/', method: 'GET', body: data }),
        }),
        tagOwnerList: builder.mutation({
            query: (data) => ({ url: '/api/tag/tag_ownerlist/', method: 'POST', body: data }),
        }),
        getRouteFixing: builder.mutation({
            query: (data) => ({ url: '/api/getRoute/', method: 'POST', body: data }),
        }),
        addRoute: builder.mutation({
            query: (data) => ({ url: '/api/saveRoute/', method: 'POST', body: data }),
        }),
        deleteRoute: builder.mutation({
            query: (data) => ({ url: '/api/delRoute/', method: 'POST', body: data }),
        }),
        getRoute: builder.mutation({
            query: (data) => ({ url: '/api/get_routePath/', method: 'POST', body: data }),
        }),
    }),
});

export const { useGetVehiclesQuery, useGetLiveTrackingQuery, useTagOwnerListMutation, useGetRouteFixingMutation, useAddRouteMutation, useDeleteRouteMutation, useGetRouteMutation } = locationServices;