import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../../utility/types/types";
import {
  changeEmail,
  changeFullname,
  changePassword,
  changeUsername,
  fetchUserInfo,
  getAvatar,
  getBgImage,
  getContentBgImage,
  resetBgImage,
  resetContentBgImage,
  uploadAvatar,
  uploadBgImage,
  uploadContentBgImage,
} from "./asyncActions";

const initialState: UserState = {
  error: null,
  user: null,
  isLoading: false,
  avatar: undefined,
  bgImage: undefined,
  contentBgImage: undefined,
};

const handleFulfilledState = (
  state: UserState,
  action: PayloadAction<any>,
  key: keyof UserState
) => {
  state.isLoading = false;
  state[key] = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "user");
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "avatar");
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "avatar");
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "user");
      })
      .addCase(changeFullname.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "user");
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "user");
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "user");
      })
      .addCase(getBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "bgImage");
      })
      .addCase(uploadBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "bgImage");
      })
      .addCase(resetBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "bgImage");
      })
      .addCase(getContentBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "contentBgImage");
      })
      .addCase(uploadContentBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "contentBgImage");
      })
      .addCase(resetContentBgImage.fulfilled, (state, action) => {
        handleFulfilledState(state, action, "contentBgImage");
      })
      //handle all pending cases
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      //handle all rejected cases
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string | null>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
