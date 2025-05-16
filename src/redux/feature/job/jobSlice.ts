import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
});
