import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';
import RocketAnimation from '../../../components/RocketAnimation';
import {jwtDecode} from 'jwt-decode';
import API from "../../../utils/axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [message, setMessage] = useState('');

  // Your services & timeSlots arrays
  const services = ['Consulting', 'Development', 'Design', 'Support'];
  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];


useEffect(() => {
  const fetchUser = async () => {
    try {
      let token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
      if (!token) throw new Error("No auth token found");

      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      const res = await API.get("/auth/me");
      const user = res.data;

      setFormData(prev => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || ""
      }));
    } catch (err) {
      console.error("Initial fetch failed:", err);

      // If token expired (401), try refresh
      if (err.response && err.response.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token found");

          const res = await API.post("/auth/refresh", { refresh_token: refreshToken });
          const { access_token, refresh_token: newRefresh } = res.data;

          // Save new tokens
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", newRefresh);

          // Retry fetchUser with new token
          const retry = await API.get("/auth/me");
          const user = retry.data;

          setFormData(prev => ({
            ...prev,
            fullName: user.name || "",
            email: user.email || ""
          }));
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
          // Redirect or logout logic
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/login"; // Or use router
        }
      }
    }
  };

  fetchUser();
}, []);


  function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowRocket(true);
    setMessage('');

    try {
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
      if (!token) throw new Error("User not authenticated");

      const decoded = jwtDecode(token);
      console.log("Decoded JWT on submit:", decoded);

      const dateTimeString = new Date(`${formData.date}T${convertTo24Hour(formData.time)}:00`).toISOString();

      const payload = {
        service: formData.service,
        date: dateTimeString,
        notes: formData.message || "",
        phone: formData.phone || "",
        company: formData.company || "",
      };

      console.log("Sending booking payload:", payload);

      await API.post("/bookings/", payload);

      setMessage("✅ Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "❌ Booking failed. Please try again.");
      // You can handle 401 here if you want, but ideally the route guard will catch it next render
    } finally {
      setIsLoading(false);
      setShowRocket(false);
    }
  };

  const handleRocketComplete = () => {
    setShowRocket(false);
    setIsLoading(false);
    console.log('Booking animation complete');
  };

  return (
    <>
      <div className="glass-card p-8 lg:p-12 w-full max-w-2xl fade-in-up delay-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Book a Consultation</h2>
          <p className="text-muted-foreground">
            Schedule a call with our experts to discuss your project needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service */}
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium text-foreground">Service Type</label>
            <div className="relative">
              <Building size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <select
                id="service"
                required
                className="glass-input w-full pl-12 appearance-none"
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
              >
                <option className='bg-black' value="">Select a service</option>
                {services.map(service => (
                  <option className='bg-black' key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-foreground">Preferred Date</label>
              <div className="relative">
                <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="date"
                  type="date"
                  required
                  className="glass-input w-full pl-12"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-foreground">Preferred Time</label>
              <div className="relative">
                <Clock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="time"
                  required
                  className="glass-input w-full pl-12 appearance-none"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option className='bg-black' key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="fullName"
                  type="text"
                  required
                  disabled
                  className="glass-input w-full pl-12"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  disabled
                  className="glass-input w-full pl-12"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Phone & Company */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
              <div className="relative">
                <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  className="glass-input w-full pl-12"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-foreground">Company (Optional)</label>
              <div className="relative">
                <Building size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="company"
                  type="text"
                  className="glass-input w-full pl-12"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">Project Details</label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-4 top-4 text-muted-foreground" />
              <textarea
                id="message"
                rows={4}
                className="glass-input w-full pl-12 pt-4 resize-none"
                placeholder="Tell us about your project requirements..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Booking Consultation...' : 'Book Consultation'}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>

      <RocketAnimation
        isVisible={showRocket}
        message="Booking Consultation..."
        onComplete={handleRocketComplete}
      />
    </>
  );
};

export default BookingForm;
