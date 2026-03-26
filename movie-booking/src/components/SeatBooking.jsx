import { useEffect, useState } from "react";
import '../App.css'

function SeatBooking({ movie, goBack }) {

  const seats = Array.from({length: 20}, (_,i)=>i+1);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([])

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("bookings"))|| []
    
    const currentMovieBookings = stored.filter(b => b.movie === movie.name);
    const taken = currentMovieBookings.flatMap(b=>b.seats)
    setBookedSeat(taken)
  },[movie.name])
  const toggleSeat = (seat) => {
    if(bookedSeat.includes(seat)) return;
    if(selectedSeats.includes(seat)){
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }

  };

  const confirmBooking = () => {
    if(selectedSeats.length === 0){
      alert("Please select atleast one seat")
      return 
    }

    const booking = {
      movie: movie.name,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem("bookings", JSON.stringify([...stored, booking]));

    alert("Booking Confirmed!");

    goBack();
  };

  return (

    <div className="flex flex-col">

      <h2 className="text-2xl font-bold">{movie.name}</h2>

      <div className="grid grid-cols-5 gap-2 justify-center w-[20%] m-auto">

        {seats.map(seat => {
          const isBooked = bookedSeat.includes(seat)
          const isSelected = selectedSeats.includes(seat)
        return(

          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            disabled={isBooked}
            className={`border border-black rounded p-2 text-center transition
              ${
                isBooked
                  ? "bg-red-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-green-500 text-white"
                  : "bg-white hover:bg-blue-100"
              }
            `}
          >
              {seat}
          </button>

        )})}

      </div>

      <br/>

      <div className="flex flex-col gap-2 justify-center items-center">

        <button className="border m-auto py-1 px-2 rounded-lg bg-[#e07a5f] text-lg font-bold" onClick={confirmBooking}>Confirm Booking</button>
        <button className="border m-auto py-1 px-2 rounded-lg bg-[#e07a5f] text-lg font-bold" onClick={goBack}>Back</button>
      </div>

    </div>

  );
}

export default SeatBooking;