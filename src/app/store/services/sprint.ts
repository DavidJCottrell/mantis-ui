import { api } from "./api";

export const sprintApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSprint: build.query<any, number>({
      query: (id: number) => `/sprints/getSprint?SprintId=${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Sprint", id: arg }],
    }),
  }),
});

export const { useGetSprintQuery } = sprintApi;
