import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import { UserState } from "../../utility/types/types";

const initialState: UserState = {
  error: null,
  user: null,
  isLoading: false,
  avatar: undefined,
  bgImage: undefined,
  contentBgImage: undefined,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/Account/user-info", {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch user info"
      );
    }
  }
);

//get avatar
export const getAvatar = createAsyncThunk(
  "user/getAvatar",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/Account/download-avatar", {
        withCredentials: true,
        responseType: "blob",
      });

      const avatarUrl = URL.createObjectURL(res.data);
      return avatarUrl;
    } catch (error: any) {
      console.error("Failed to fetch avatar: ", error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get avatar"
      );
    }
  }
);

//upload avatar
export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (avatarFile: File, thunkAPI) => {
    const formData = new FormData();
    formData.append("avatarFile", avatarFile);
    try {
      const res = await api.post("Account/upload-avatar", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error: any) {
      console.error("Failed to upload avatar: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to upload avatar"
      );
    }
  }
);

export const changeUsername = createAsyncThunk(
  "user/changeUsername",
  async (newUsername: string, thunkAPI) => {
    try {
      const res = await api.put(
        "/Account/username/change",
        { NewUsername: newUsername },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      console.error("Failed to update username: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update username"
      );
    }
  }
);

export const changeFullname = createAsyncThunk(
  "user/changeFullname",
  async (
    {
      newFirstName,
      newLastName,
    }: { newFirstName: string; newLastName: string },
    thunkAPI
  ) => {
    try {
      const res = await api.put(
        "/Account/fullname/change",
        {
          NewFirstName: newFirstName,
          NewLastName: newLastName,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      console.error("Failed to update fullname: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update fullname"
      );
    }
  }
);

export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  async (newEmail: string, thunkAPI) => {
    try {
      const res = await api.put(
        "/Account/email/change",
        {
          NewEmail: newEmail,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      console.error("Failed to change email: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to change email"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePasswod",
  async (
    {
      currentPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const res = await api.put(
        "Account/password/change",
        {
          NewPassword: newPassword,
          CurrentPassword: currentPassword,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      console.error("Failed to change password: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to change password"
      );
    }
  }
);

//get bg image
export const getBgImage = createAsyncThunk(
  "user/getBgImage",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("Account/download-image/main/background", {
        withCredentials: true,
        responseType: "blob",
      });

      const bgImageUrl = URL.createObjectURL(res.data);
      return bgImageUrl;
    } catch (error: any) {
      console.error("Failed to fetch bg image: ", error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get bg image"
      );
    }
  }
);

//upload bg image
export const uploadBgImage = createAsyncThunk(
  "user/uploadBgImage",
  async (backgroundFile: File, thunkAPI) => {
    const formData = new FormData();
    formData.append("backgroundFile", backgroundFile);
    try {
      const res = await api.post(
        "Account/upload-image/main/background",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error: any) {
      // console.error("Failed to upload bg image: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to upload bg image"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get user
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      //get user avatar
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      //upload avatar
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      //change username
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      //change fullname
      .addCase(changeFullname.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      //change email
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      //change password
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      //get bg image
      .addCase(getBgImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bgImage = action.payload;
      })
      //upload bg image
      .addCase(uploadBgImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bgImage = action.payload;
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
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default userSlice.reducer;
