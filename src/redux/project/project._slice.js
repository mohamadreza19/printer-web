import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const project = createSlice({
  name: "project",
  initialState: {
    projectName: "",
    rails: [],
    base: "",
    railWidth: 0,
    raillength: 0,
    bordersToPrint: "",
    numberOfRails: 0,
  },

  reducers: {
    fetchProject(state, action) {
      return action.payload;
    },
  },
});

export const { fetchProject } = project.actions;
//

export const getProjectDimensions = (state) => {
  const width = state.project.railWidth;
  const height = state.project.raillength;
  return {
    width,
    height,
  };
};
//
export const getProject = (state) => state.project;
export const getProjectRailWidth = (state) => state.project.railWidth;

export default project.reducer;
