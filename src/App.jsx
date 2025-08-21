// App.jsx or index.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Signup/Signup";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard/UserDashboard"; // Make sure Layout wraps user pages
import Dashboard from "./pages/Dashboard/Components/Dashboard";
import Profile from "./pages/Dashboard/Components/Profile";
import Index from "./pages/Dashboard/Components/Index";
import TemplateOverview from "./pages/Dashboard/Components/TemplateOverview";
import Leaderboard from "./pages/Dashboard/Components/Leaderboard";
import BookingDetails from "./pages/Dashboard/Components/BookingDetails";
import TemplatesPage from "./pages/Templates/Templates";
import UserTemplate from "./pages/Dashboard/Components/UserTemplate";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/Auth/Forgotpassword/ForgotPassword";
import VerifyPage from "./pages/Auth/verify-email";
import Booking from "./pages/Booking/Booking";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyPage />} />
          <Route path="/templates" element={<TemplatesPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* User Dashboard with nested routes */}
            <Route path="/user-dashboard" element={<UserDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="templates" element={<Index />} />
              <Route path="user-templates" element={<UserTemplate />} />
              <Route path="template/:id" element={<TemplateOverview />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="booking/:id" element={<BookingDetails />} />
              <Route path="builder" element={<div className="text-white text-center py-20">Drag & Drop Builder - Coming Soon</div>} />
              <Route path="code-editor" element={<div className="text-white text-center py-20">Code Editor - Coming Soon</div>} />
              <Route path="assets" element={<div className="text-white text-center py-20">Assets Library - Coming Soon</div>} />
              <Route path="deploy" element={<div className="text-white text-center py-20">Deploy & Hosting - Coming Soon</div>} />
              <Route path="integrations" element={<div className="text-white text-center py-20">Integrations - Coming Soon</div>} />
              <Route path="analytics" element={<div className="text-white text-center py-20">Analytics - Coming Soon</div>} />
            </Route>

            {/* Other protected routes */}
            <Route path="/new-booking" element={<Booking />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
