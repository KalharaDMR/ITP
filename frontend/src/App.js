import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainHome from './Components/MainHome/MainHome';
import Home from './Components/Home/Home'; // Safari home
import EventsHome from './Components/EventsHome/EventsHome';
import SafariTypes from './Components/SafariTypes/SafariTypes';
import EventTypes from './Components/EventTypes/EventTypes';
import AddRoom from './Components/AddRoom/AddRoom';
import EventBooking from './Components/EventBooking/EventBooking';
import Rooms from './Components/RoomDetails/Rooms';
import EventRooms from './Components/EventDetails/EventRooms';
import UpdateRoom from './Components/UpdateRoom/UpdateRoom';
import UpdateEvent from './Components/UpdateEvent/UpdateEvent';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import EventSignin from './Components/Auth/EventSignin';
import Payment from './Components/Payment/Payment';
import EventPayment from './Components/EventPayment/EventPayment';
import PaymentGateway from './Components/Payment/PaymentGateway';
import PaymentSuccess from './Components/Payment/PaymentSuccess';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminBookings from './Components/Admin/AdminBookings';
import AdminEvents from './Components/Admin/AdminEvents';
import NotFound from './Components/Common/NotFound';
import ProtectedAdminRoute from './Components/Admin/ProtectedAdminRoute';
import AdminDashboard from './Components/Admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Main Entry Point */}
      <Route path="/" element={<MainHome />} />

      {/* Safari Routes */}
      <Route path="/safari-home" element={<Home />} />
      <Route path="/safaritypes" element={<SafariTypes />} />
      <Route path="/addroom" element={<AddRoom />} />
      <Route path="/roomdetails" element={<Rooms />} />
      <Route path="/update/:id" element={<UpdateRoom />} />
      <Route path="/payment" element={<Payment />} />
      
      {/* Safari Auth */}
      <Route path="/safari-signin" element={<Signin />} />
      <Route path="/safari-register" element={<Register />} />
      
      {/* Events Routes */}
      <Route path="/events-home" element={<EventsHome />} />
      <Route path="/eventtypes" element={<EventTypes />} />
      <Route path="/eventbooking" element={<EventBooking />} />
      <Route path="/eventdetails" element={<EventRooms />} />
      <Route path="/update-event/:id" element={<UpdateEvent />} />
      <Route path="/eventpayment" element={<EventPayment />} />
      
      {/* Events Auth */}
      <Route path="/events-signin" element={<EventSignin />} />
      
      {/* Common Payment */}
      <Route path="/paymentgateway" element={<PaymentGateway />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/bookings" 
        element={
          <ProtectedAdminRoute>
            <AdminBookings />
          </ProtectedAdminRoute>
        } 
      />
      <Route 
        path="/admin/events" 
        element={
          <ProtectedAdminRoute>
            <AdminEvents />
          </ProtectedAdminRoute>
        } 
      />

// Update the admin routes in your App.js
<Route path="/admin/login" element={<AdminLogin />} />
<Route 
  path="/admin" 
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  } 
/>
<Route 
  path="/admin/bookings" 
  element={
    <ProtectedAdminRoute>
      <AdminBookings />
    </ProtectedAdminRoute>
  } 
/>
<Route 
  path="/admin/events" 
  element={
    <ProtectedAdminRoute>
      <AdminEvents />
    </ProtectedAdminRoute>
  } 
/>
      
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;