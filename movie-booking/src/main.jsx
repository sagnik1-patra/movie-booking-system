import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import "./App.css";
import Layout from "./Layout";
import BookingHistory from "./components/BookingHistory";
import MovieList from "./components/MovieList";
import SeatBooking from "./components/SeatBooking";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout/>}>
      <Route index element={<MovieList/>}/>
      <Route path="booking" element={<SeatBooking/>}/>
      <Route path="bookinghistory" element={<BookingHistory/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)