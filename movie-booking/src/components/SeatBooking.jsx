import { useState } from "react";

function SeatBooking({ movie, goBack }) {

  const seats = Array.from({length: 20}, (_,i)=>i+1);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {

    if(selectedSeats.includes(seat)){
      setSelectedSeats(selectedSeats.filter(s=>s!==seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }

  };

  const confirmBooking = () => {

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

    <div>

      <h2>{movie.name}</h2>

      <div className="seats">

        {seats.map(seat => (

          <button
            key={seat}
            className={selectedSeats.includes(seat) ? "selected" : ""}
            onClick={()=>toggleSeat(seat)}
          >
            {seat}
          </button>

        ))}

      </div>

      <br/>

      <button onClick={confirmBooking}>Confirm Booking</button>
      <button onClick={goBack}>Back</button>

    </div>

  );
}

export default SeatBooking;