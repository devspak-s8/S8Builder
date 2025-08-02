// index.jsx or App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";


import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Signup/Signup";
import ProtectedRoute from "./pages/Dashboard/Components/ProtectedRoute";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import TemplatesPage from "./pages/Templates/Templates";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/Auth/Forgotpassword/ForgotPassword";
import Booking from "./pages/Booking/Booking";
export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/new-booking" element={<Booking />} />
          {/* Protected Routes */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
