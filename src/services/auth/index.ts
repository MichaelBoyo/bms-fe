// Importing required types from the 'auth' module
import {
    BusinessSignUpRequest,
    SignupRequest,
    SignupResponse,
} from "@/types/services/auth";

// Importing functions from the 'reduxjs/toolkit' and 'reduxjs/toolkit/query/react' libraries
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// A helper function to create a POST request object
const postRequest = (url: string, details: unknown) => ({
    url,
    method: "POST",
    body: details,
});
export const url = "https://bms-api.up.railway.app/api/booking-mgt/v1";

// Creating an API using the 'createApi' function
export const auth = createApi({
    reducerPath: "auth", // The slice name for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: url, // The base URL for the API requests
    }),
    endpoints: (builder) => ({
        // Defining a 'signup' mutation endpoint
        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (credentials) => postRequest("/user/sign-up", credentials), // Defining the API endpoint and the request details
        }),

        // Defining a 'businessSignup' mutation endpoint
        businessSignup: builder.mutation<SignupResponse, BusinessSignUpRequest>({
            query: (credentials) => postRequest("/business", credentials), // Defining the API endpoint and the request details
        }),

    }),
});

// Extracting and exporting the mutation hooks for easy usage
export const {
    useSignupMutation,
    useBusinessSignupMutation
} = auth;
