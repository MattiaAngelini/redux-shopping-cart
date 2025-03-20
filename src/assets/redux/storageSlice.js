import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Creiamo l'istanza API con RTK Query
export const apiSlice = createApi({
  reducerPath: 'api', // Nome del reducer nello store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }), // Base URL API
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products', // Definiamo l'endpoint della chiamata
    }),
  }),
});

// Esportiamo il hook generato automaticamente per usare la query
export const { useGetProductsQuery } = apiSlice;