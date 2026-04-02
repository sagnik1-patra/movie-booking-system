import { useEffect, useState } from "react";
import '../App.css'

function BookingHistory(){

  const [bookings, setBookings] = useState([]);

  useEffect(()=>{

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);

  },[])

  return(

    <div className="flex-1 min-h-screen bg-[#f2cc8f]">

      <h2 className="text-lg font-bold  underline text-center pt-4">Booking History</h2>

        <div className="grid grid-cols-6 gap-10 justify-center items-center p-4 ">

          {bookings.map((b,i)=>(  
            
            <div key={i} className="flex flex-col justify-around items-center bg-[#f4f1de] p-4 rounded-2xl border ">
              <img src={b.imageUrl?.medium} alt="image" className="rounded-xl h-40 w-30"/>
              <p className="font-bold text-xl underline mb-2"> {b.movie}</p>
              <p><b>Seats:</b> {b.seats.join(", ")}</p>
              <p className="text-sm"><b>Date:</b> {b.date}</p>

            </div>

          ))}

        </div>
    </div>

  )

}

export default BookingHistory