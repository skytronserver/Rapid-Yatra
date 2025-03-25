import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem('oAuthToken');
      
      if (token) {
        console.log('Setting headers with token:', token);
        headers.set('authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Manufacturer', 'Dealer', 'VehicleOwner'],
  endpoints: () => ({}),
}); 