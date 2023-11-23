import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const sprintTags = ["Sprint"];

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: [...sprintTags],
  endpoints: () => ({}),
});
