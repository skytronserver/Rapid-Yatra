    import { api } from "./api";

export const taggingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.mutation({
      query: (data) => ({
        url: 'api/devicestock/deviceStockFilter/',
        method: 'POST',
        body: data,
      }),
    }),
    untagDevice: builder.mutation({
      query: (data) => ({
        url: 'api/tag/cancelTagDevice2Vehicle/',
        method: 'POST',
        body: data,
      }),
    }),
    fetchDeviceListFortagging: builder.mutation({
      query: (data) => ({
        url: '/api/devicestock/deviceStockFilter/',
        method: 'POST',
        body: data,
      }),
    }),
    fetchVehicleCategory: builder.query({
      query: (data) => ({
        url: '/api/Settings/filter_settings_VehicleCategory/',
        method: 'POST',
        body: data,
      }),
      providesTags: ['VehicleCategory'],
    }),
    verifyDealerOtp: builder.mutation({
      query: (data) => ({
        url: '/api/tag/TagVerifyDealerOtp/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOwnerOtp: builder.mutation({
      query: (data) => ({
        url: '/api/tag/TagVerifyOwnerOtp/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOwnerOtpFinal: builder.mutation({
      query: (data) => ({
        url: '/api/tag/TagVerifyOwnerOtpFinal/',
        method: 'POST',
        body: data,
      }),
    }),
    vahanVerify: builder.mutation({
      query: (data) => ({
        url: '/api/tag/GetVahanAPIInfo/',
        method: 'POST',
        body: data,
      }),
    }),
    liveTrackingData: builder.query({
      query: (data) => ({
        url: '/api/gps_track_data_api',
        method: 'POST',
        body: data,
      }),
    }),
    tagDevice: builder.mutation({
      query: (data) => ({
        url: '/api/tag/TagDevice2Vehicle/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetDevicesMutation, useUntagDeviceMutation, useFetchDeviceListFortaggingMutation, useFetchVehicleCategoryQuery, useVerifyDealerOtpMutation, useVerifyOwnerOtpMutation, useVerifyOwnerOtpFinalMutation, useVahanVerifyMutation, useLiveTrackingDataQuery, useTagDeviceMutation } = taggingApi;


