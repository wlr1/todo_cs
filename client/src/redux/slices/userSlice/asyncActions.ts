import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

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
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to change email"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
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
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      return thunkAPI.rejectWithValue({ message: errorMessage });
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
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to upload bg image"
      );
    }
  }
);

//reset bg image
export const resetBgImage = createAsyncThunk(
  "user/resetBgImage",
  async (_, thunkAPI) => {
    try {
      const res = await api.put("Account/reset-image/main/background", {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to reset bg image"
      );
    }
  }
);

//get content bg image
export const getContentBgImage = createAsyncThunk(
  "user/getContentBgImage",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("Account/download-image/content/background", {
        withCredentials: true,
        responseType: "blob",
      });

      const bgContentImageUrl = URL.createObjectURL(res.data);
      return bgContentImageUrl;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch content bg image"
      );
    }
  }
);

//upload content bg image
export const uploadContentBgImage = createAsyncThunk(
  "user/uploadContentBgImage",
  async (contentFile: File, thunkAPI) => {
    const formData = new FormData();
    formData.append("contentFile", contentFile);
    try {
      const res = await api.post(
        "Account/upload-image/content/background",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to upload content bg image"
      );
    }
  }
);

//reset to default content bg image
export const resetContentBgImage = createAsyncThunk(
  "user/resetContentBgImage",
  async (_, thunkAPI) => {
    try {
      const res = await api.put("Account/reset-image/content/background", {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to reset content bg image"
      );
    }
  }
);
