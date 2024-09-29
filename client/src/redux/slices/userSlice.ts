import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { UserState } from "../../utility/types/types";

const initialState: UserState = {
  error: null,
  user: null,
  isLoading: false,
  avatar: undefined,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get user
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //get user avatar
      .addCase(getAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //change username
      .addCase(changeUsername.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //change fullname
      .addCase(changeFullname.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeFullname.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(changeFullname.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //change email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
