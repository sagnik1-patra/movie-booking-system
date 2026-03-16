import { useEffect, useState } from "react";

function BookingHistory(){

  const [bookings, setBookings] = useState([]);

  useEffect(()=>{

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);

  },[])

  return(

    <div>

      <h2>Booking History</h2>

      {bookings.map((b,i)=>(

        <div key={i} className="booking">

          <p><b>Movie:</b> {b.movie}</p>
          <p><b>Seats:</b> {b.seats.join(", ")}</p>
          <p><b>Date:</b> {b.date}</p>

        </div>

      ))}

    </div>

  )

}

export default BookingHistory