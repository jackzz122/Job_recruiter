import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "Companies",
    "Users",
    "Jobs",
    "Comments",
    "Majors",
    "Reports",
    "Pendings",
    "Recruiter",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
export default ApiSlice;
