import { useEffect, useState } from "react";
import '../App.css'

function BookingHistory(){

  const [bookings, setBookings] = useState([]);

  useEffect(()=>{

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);

  },[])

  return(

    <div className="h-full">

      <h2 className="text-lg font-bold  underline">Booking History</h2>

        <div className="grid grid-cols-5 justify-center items-center">

          {bookings.map((b,i)=>(
            
            <div key={i} className="booking">

              <p><b>Movie:</b> {b.movie}</p>
              <p><b>Seats:</b> {b.seats.join(", ")}</p>
              <p><b>Date:</b> {b.date}</p>

            </div>

          ))}

        </div>
    </div>

  )

}

export default BookingHistory