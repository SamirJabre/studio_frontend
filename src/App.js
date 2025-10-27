import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Editor from "./Pages/Editor";
import ProjectNotFound from "./Pages/ProjectNotFound";
import RequireAuth from "./Routes/RequireAuth";
import RequireGuest from "./Routes/RequireGuest";
import { ToastProvider } from "./Context/ToastContext";

const App = () => {
  return (
    // <button onClick={fetchUsers}>Fetch Users</button>
    <ToastProvider>
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
          <Route path="/404" element={<ProjectNotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};
export default App;
