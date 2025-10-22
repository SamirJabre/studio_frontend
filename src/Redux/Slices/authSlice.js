import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-encode";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Thunk for login request
export const loginRequest = createAsyncThunk(
  "auth/loginRequest",
  async ({ email, password }, { rejectWithValue }) => {
    if (!email || !password) {
      return rejectWithValue("Email and password are required.");
    }

    if (!EMAIL_REGEX.test(email)) {
      return rejectWithValue("Please enter a valid email address.");
    }
    if (typeof password !== "string" || password.length < 5) {
      return rejectWithValue("Password must be at least 5 characters.");
    }

    try {
      const response = await axios.get("users", {
        params: { email, password },
      });

      const user = response?.data?.[0];
      console.log(user);
      if (user) {
        const token = jwt(
          {
            id: user.id,
            email: user.email,
            password: user.password,
          },
          "SHHHHHHHHHHH"
        );
        localStorage.setItem("token", token);
        return { user: { ...user, password: undefined, token } };
      }
      return rejectWithValue("Invalid email or password.");
    } catch (error) {
      return rejectWithValue("Server Error");
    }
  }
);

export const registerRequest = createAsyncThunk(
  "auth/registerRequest",
  async ({ name, email, password }, { rejectWithValue }) => {
    if (!name || !email || !password) {
      return rejectWithValue("Name, email, and password are required.");
    }
    if (typeof name !== "string" || name.length > 15) {
      return rejectWithValue("Name must not exceed 15 characters.");
    }

    if (!EMAIL_REGEX.test(email)) {
      return rejectWithValue("Please enter a valid email address.");
    }
    if (typeof password !== "string" || password.length < 5) {
      return rejectWithValue("Password must be at least 5 characters.");
    }

    try {
      const checkResponse = await axios.get("users", { params: { email } });
      if (checkResponse.data && checkResponse.data.length > 0) {
        return rejectWithValue("An account with this email already exists.");
      }

      const response = await axios.post("users", {
        name,
        email,
        password,
      });
      const newUser = response.data;
      console.log(newUser);
      const token = jwt(
        {
          id: newUser.id,
          email: newUser.email,
          password: newUser.password,
        },
        "SHHHHHHHHHHH"
      );
      localStorage.setItem("token", token);
      return { user: { ...newUser, password: undefined, token } };
    } catch (error) {
      console.error("Register failed", error);
      return rejectWithValue("Server Error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(registerRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
