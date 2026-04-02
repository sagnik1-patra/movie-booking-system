import { useState } from "react";
import MovieList from "./components/MovieList";
import SeatBooking from "./components/SeatBooking";
import BookingHistory from "./components/BookingHistory";
import './App.css'

function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="flex flex-col p-10 bg-[#f2cc8f] min-h-screen">

      <h1 className="text-4xl font-bold bg-[#81b29a] rounded-2xl mx-auto p-3">🎬 Movie Booking System</h1>

      {!selectedMovie ? (
        <MovieList setSelectedMovie={setSelectedMovie}/>
      ) : (
        <SeatBooking movie={selectedMovie} goBack={()=>setSelectedMovie(null)}/>
      )}
      <hr/>
      <BookingHistory/>

    </div>
  );
}

export default App;