import { createSlice } from "@reduxjs/toolkit";
import { JobFormData } from "../../../types/JobType";

const initialState: JobFormData = {
  title: "",
  sizingPeople: 1,
  majorId: [],
  salaryRange: 1000,
  description: {
    keySkills: {
      mainText: "",
      bulletPoints: [],
    },
    whyYouLoveIt: {
      mainText: "",
      bulletPoints: [],
    },
  },
  image: null,
};

export const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeSizingPeople: (state, action) => {
      state.sizingPeople = action.payload;
    },
    changeMajorId: (state, action) => {
      state.majorId = action.payload;
    },
    changeSalaryRange: (state, action) => {
      state.salaryRange = action.payload;
    },
    changeKeySkills: (state, action) => {
      state.description.keySkills = action.payload;
    },
    changeWhyYouLoveIt: (state, action) => {
      state.description.whyYouLoveIt = action.payload;
    },
    changeImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {
  changeTitle,
  changeSizingPeople,
  changeMajorId,
  changeSalaryRange,
  changeKeySkills,
  changeWhyYouLoveIt,
  changeImage,
} = JobSlice.actions;
export default JobSlice.reducer;
