import { createSlice } from "@reduxjs/toolkit";

const edgeSlice = createSlice({
  name: "edge",
  initialState: {
    edgeId: null,
  },
  reducers: {
    setEdgeId: (state, actions) => {
      state.edgeId = actions.payload;
    },
  },
});

export const { setEdgeId } = edgeSlice.actions;
export default edgeSlice.reducer;
