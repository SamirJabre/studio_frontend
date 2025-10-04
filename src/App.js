import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import axios from "axios";
import Register from "./Pages/Register";

axios.defaults.baseURL = "http://localhost:4000";

const fetchUsers = async () => {
  try {
    const response = await axios.get("/users");
    console.log("Users:", response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const addUser = async () => {
  try {
    const response = await axios.post("/users", {
      id: Date.now(),
      email: "newuser@example.com",
      password: "password123",
      name: "New User",
    });
    console.log("Users:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const App = () => {
  return (
    // <button onClick={fetchUsers}>Fetch Users</button>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
