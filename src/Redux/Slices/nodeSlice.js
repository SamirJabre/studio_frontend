import { createSlice } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    nodeId: null,
    nodeType: null,
  },
  reducers: {
    setNodeId: (state, actions) => {
      state.nodeId = actions.payload;
    },
    setNodeType: (state, actions) => {
      state.nodeType = actions.payload;
    },
  },
});

export const { setNodeId, setNodeType } = nodeSlice.actions;
export default nodeSlice.reducer;
