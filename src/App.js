import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import axios from "axios";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Editor from "./Pages/Editor";
import AccessDenied from "./Pages/AccessDenied";
import ProjectNotFound from "./Pages/ProjectNotFound";
import RequireAuth from "./Routes/RequireAuth";
import RequireGuest from "./Routes/RequireGuest";

axios.defaults.baseURL = "http://localhost:4000";

// const fetchUsers = async () => {
//   try {
//     const response = await axios.get("/users");
//     console.log("Users:", response.data);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// };

// const addUser = async () => {
//   try {
//     const response = await axios.post("/users", {
//       id: Date.now(),
//       email: "newuser@example.com",
//       password: "password123",
//       name: "New User",
//     });
//     console.log("Users:", response.data);
//   } catch (error) {
//     console.error("Error adding user:", error);
//   }
// };

const App = () => {
  return (
    // <button onClick={fetchUsers}>Fetch Users</button>
    <BrowserRouter>
      <Routes>
        {/* Public route available to everyone */}
        <Route path="/" element={<Landing />} />

        {/* Guest-only routes: hidden when authenticated */}
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes: require authentication */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Route>

        {/* Optional utility routes */}
        <Route path="/accessdenied" element={<AccessDenied />} />
        <Route path="/404" element={<ProjectNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
