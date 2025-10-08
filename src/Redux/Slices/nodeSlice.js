import { createSlice } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    nodeId: null,
  },
  reducers: {
    setNodeId: (state, actions) => {
      state.nodeId = actions.payload;
    },
  },
});

export const { setNodeId } = nodeSlice.actions;
export default nodeSlice.reducer;
