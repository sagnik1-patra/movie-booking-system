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

    <div>

      <h2>{movie.name}</h2>

      <div className="seats">

        {seats.map(seat => {
          const isBooked = bookedSeat.includes(seat)
          const isSelected = selectedSeats.includes(seat)
        return(

          <button
            key={seat}
            className={`${isBooked?"booked":""} ${isSelected? "selected":""}`}
            onClick={()=>toggleSeat(seat)}
            disabled={isBooked}
          >
            {seat}
            
          </button>

        )})}

      </div>

      <br/>

      <button onClick={confirmBooking}>Confirm Booking</button>
      <button onClick={goBack}>Back</button>

    </div>

  );
}

export default SeatBooking;