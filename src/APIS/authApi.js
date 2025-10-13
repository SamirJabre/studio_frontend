import jwt from "jwt-encode";
import axios from "axios";
import { login } from "../Redux/Slices/authSlice.js";
axios.defaults.baseURL = "http://localhost:4000";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginRequest = async (email, password, dispatch) => {
  if (!email || !password) {
    return { status: "error", message: "Email and password are required." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (typeof password !== "string" || password.length < 5) {
    return {
      status: "error",
      message: "Password must be at least 5 characters.",
    };
  }

  try {
    const response = await axios.get("/users", {
      params: { email, password },
    });
    console.log(response.data);

    const user = response?.data?.[0];
    if (user) {
      dispatch(login({ ...user, password: undefined }));
      const token = jwt({ id: user.id, email: user.email }, "SHHHHHHHHHHH");
      localStorage.setItem("token", token);
      return { status: "success", token };
    }
    return { status: "error", message: "Invalid email or password." };
  } catch (error) {
    console.error("Login failed", error);
    return { status: "error", message: "Login failed. Please try again." };
  }
};

export const registerRequest = async (name, email, password, dispatch) => {
  if (!name || !email || !password) {
    return {
      status: "error",
      message: "Name, email, and password are required.",
    };
  }
  if (typeof name !== "string" || name.length > 15) {
    return {
      status: "error",
      message: "Name must not exceed 15 characters.",
    };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (typeof password !== "string" || password.length < 5) {
    return {
      status: "error",
      message: "Password must be at least 5 characters.",
    };
  }

  try {
    const checkResponse = await axios.get("/users", {
      params: { email },
    });

    if (checkResponse?.data?.length > 0) {
      return {
        status: "error",
        message: "An account with this email already exists.",
      };
    }
    const createResponse = await axios.post("/users", {
      name,
      email,
      password,
    });

    const newUser = createResponse?.data;
    if (newUser) {
      dispatch(login({ ...newUser, password: undefined }));
      const token = jwt(
        { id: newUser.id, email: newUser.email },
        "SHHHHHHHHHHH"
      );
      localStorage.setItem("token", token);
      return { status: "success", token };
    }

    return {
      status: "error",
      message: "Registration failed. Please try again.",
    };
  } catch (error) {
    console.error("Registration failed", error);
    return {
      status: "error",
      message: "Registration failed. Please try again.",
    };
  }
};
