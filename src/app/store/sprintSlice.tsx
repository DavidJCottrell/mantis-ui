import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SprintState {
  id: number;
}

const initialState = { id: 0 } as SprintState;

const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    setSprintId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

export const { setSprintId } = sprintSlice.actions;
export default sprintSlice.reducer;
