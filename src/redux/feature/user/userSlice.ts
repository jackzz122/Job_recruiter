import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../types/UserType";
import { RootState } from "../../api/store";

const initialState: { user: UserType | undefined } = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { getUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
