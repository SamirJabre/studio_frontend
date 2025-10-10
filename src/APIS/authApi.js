import axios from "axios";
import { login } from "../Redux/Slices/authSlice.js";

// Configure axios base URL (centralized here for now)
axios.defaults.baseURL = "http://localhost:4000";

// Basic email regex; matches simple valid email formats
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// loginRequest performs minimal server-side (API-layer) validation before calling the backend
// Returns a structured response: { status: 'success' } or { status: 'error', message: string }
export const loginRequest = async (email, password, dispatch) => {
  // Guard: required fields
  if (!email || !password) {
    return { status: "error", message: "Email and password are required." };
  }

  // Guard: email format
  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Guard: password minimum length
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
      localStorage.setItem("isAuthenticated", "true");
      return { status: "success" };
    }
    return { status: "error", message: "Invalid email or password." };
  } catch (error) {
    console.error("Login failed", error);
    return { status: "error", message: "Login failed. Please try again." };
  }
};

export const registerRequest = async (name, email, password, dispatch) => {
  // Guard: required fields
  if (!name || !email || !password) {
    return {
      status: "error",
      message: "Name, email, and password are required.",
    };
  }

  // Guard: name length
  if (typeof name !== "string" || name.length > 15) {
    return {
      status: "error",
      message: "Name must not exceed 15 characters.",
    };
  }

  // Guard: email format
  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Guard: password minimum length
  if (typeof password !== "string" || password.length < 5) {
    return {
      status: "error",
      message: "Password must be at least 5 characters.",
    };
  }

  try {
    // Check if user already exists
    const checkResponse = await axios.get("/users", {
      params: { email },
    });

    if (checkResponse?.data?.length > 0) {
      return {
        status: "error",
        message: "An account with this email already exists.",
      };
    }

    // Create new user
    const createResponse = await axios.post("/users", {
      name,
      email,
      password,
    });

    const newUser = createResponse?.data;
    if (newUser) {
      // On success, update auth state and local storage
      dispatch(login({ ...newUser, password: undefined }));
      localStorage.setItem("isAuthenticated", "true");
      return { status: "success" };
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
