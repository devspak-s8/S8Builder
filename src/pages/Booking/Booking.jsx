import React from 'react';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import BookingForm from '../Booking/Components/BookingForm';

const Booking = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundBlobs />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8 lg:p-12">
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;